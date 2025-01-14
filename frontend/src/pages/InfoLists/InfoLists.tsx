import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useItems from "../../hooks/useItems";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import Layout from "../../components/LayoutPages/Layout";
import styles from "./InfoLists.module.scss";
import { Item, List } from "../../types";
import useSearch from "../../hooks/useSearch";
import { filterAndSortItems } from "../../utils/filterAndSortItems";
import { useListContext } from "../../utils/contexts/ListContext/ListContext";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { IoIosCheckboxOutline } from "react-icons/io";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import ModalAddItem from "../../components/ModalAddItem/ModalAddItem";
import { IoMdAddCircle } from "react-icons/io";

const InforLists: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items, fetchItems, updateItem, createItem, deleteItem } = useItems();
  const { lists, removeList } = useListContext();
  const { search } = useSearch();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [currentList, setCurrentList] = useState<List | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<{ id: number; type: "item" | "list" } | null>(
    null
  );
  const [editItem, setEditItem] = useState<Item | null>(null);

  useEffect(() => {
    if (id) {
      fetchItems(Number(id));
      const foundList = lists.find((list) => list.id === Number(id));
      setCurrentList(foundList || null);
    }
  }, [id, lists]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleFilterAndSort = (filterBy: string, sortBy: string, sortOrder: "asc" | "desc") => {
    const itemsToSort = searchResults.length > 0 ? searchResults : items;
    const sortedItems = filterAndSortItems(itemsToSort, filterBy, sortBy, sortOrder);
    searchResults.length > 0 ? setSearchResults(sortedItems) : setFilteredItems(sortedItems);
  };

  const handleSearch = async (query: string) => {
    const results = await search(query);
    const filteredResults = results.items.filter((item) => item.list_id === Number(id));
    setSearchResults(filteredResults);
  };

  const toggleCompletion = async (item: Item) => {
    const updatedItem = { ...item, completed: !item.completed };

    setFilteredItems((prev) =>
      prev.map((i) => (i.id === item.id ? updatedItem : i))
    );

    setSearchResults((prev) =>
      prev.map((i) => (i.id === item.id ? updatedItem : i))
    );

    try {
      await updateItem(item.list_id, item.id, {
        completed: updatedItem.completed,
      });
    } catch (error) {
      console.error("Erro ao atualizar o item:", error);
    }
  };

  const handleAddItemClick = () => {
    setEditItem(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditItemClick = (item: Item) => {
    setEditItem(item);
    setIsAddEditModalOpen(true);
  };

  const handleSaveItem = async (title: string, dueDate: string | null) => {
    try {
      if (editItem) {
        // Editar item existente
        const updatedItem = { ...editItem, title, due_date: dueDate };
        await updateItem(editItem.list_id, editItem.id, {
          title,
          due_date: dueDate,
        });
        setFilteredItems((prev) =>
          prev.map((item) => (item.id === editItem.id ? updatedItem : item))
        );
      } else {
        // Criar novo item
        const newItem = await createItem(Number(id), {
          title,
          due_date: dueDate,
          completed: false,
        });
        if (newItem) {
          setFilteredItems((prev) => [...prev, newItem]);
        }
      }
      setIsAddEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
    }
  };


  const handleDeleteClick = (id: number, type: "item" | "list") => {
    setModalTarget({ id, type });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (modalTarget) {
      try {
        if (modalTarget.type === "item") {
          await deleteItem(Number(id), modalTarget.id); // Deleta o item
          setFilteredItems((prev) => prev.filter((item) => item.id !== modalTarget.id));
        } else if (modalTarget.type === "list") {
          await removeList(modalTarget.id); // Deleta a lista
        }
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  return (
    <div className={styles.infoLists}>
      <Layout onSearchResults={handleSearch}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{currentList ? currentList.title : "Carregando..."}</h1>
          <button onClick={() => handleDeleteClick(Number(currentList?.id), "list")}>
            <MdDeleteForever />
          </button>
        </div>
        <div className={styles.addButton} onClick={handleAddItemClick}>
          <IoMdAddCircle />
        </div>
      </div>

        <FiltersBar onFilterAndSort={handleFilterAndSort} />

        <ul className={styles.itemsList}>
          {(searchResults.length > 0 ? searchResults : filteredItems).map((item) => (
            <li
              key={item.id}
              className={`${styles.item} ${item.completed ? styles.completed : ""}`}
            >
              <div className={styles.left}>
                <button className={styles.checkButton} onClick={() => toggleCompletion(item)}>
                  {item.completed ? (
                    <FaSquareCheck className={styles.check} />
                  ) : (
                    <IoIosCheckboxOutline className={styles.nocheck} />
                  )}
                </button>
                <div>
                  <h3>{item.title}</h3>
                  <p className={styles.dueDate}>
                    Data de Término: {item.due_date || "Não definido"}
                  </p>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.editButton} onClick={() => handleEditItemClick(item)}>
                  <FaRegEdit />
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteClick(item.id, "item")}>
                  <MdDeleteForever />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Layout>

      {isAddEditModalOpen && (
        <ModalAddItem
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          onSave={handleSaveItem}
          initialTitle={editItem?.title || ""}
          initialDueDate={editItem?.due_date || null}
        />
      )}

      {isDeleteModalOpen && modalTarget && (
        <DeleteModal
          title="Confirmar Exclusão"
          description={
            modalTarget.type === "list"
              ? "Tem certeza que deseja excluir esta lista?"
              : "Tem certeza que deseja excluir este item?"
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default InforLists;
