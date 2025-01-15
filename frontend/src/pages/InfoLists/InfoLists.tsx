import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useItems from "../../hooks/useItems";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import Layout from "../../components/LayoutPages/Layout";
import styles from "./InfoLists.module.scss";
import { Item, List } from "../../types";
import useSearch from "../../hooks/useSearch";
import { groupAndSort } from "../../utils/groupAndSort";
import { fieldLabels } from "../../utils/labels";
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
  const [groupedItems, setGroupedItems] = useState<Record<string, Item[]>>({});
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [currentList, setCurrentList] = useState<List | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<{ id: number; type: "item" | "list" } | null>(
    null
  );
  const [editItem, setEditItem] = useState<Item | null>(null);

  // Fetch inicial dos itens e definição da lista atual
  useEffect(() => {
    if (id) {
      fetchItems(Number(id));
      const foundList = lists.find((list) => list.id === Number(id));
      setCurrentList(foundList || null);
    }
  }, [id, lists]);

  // Agrupamento inicial dos itens quando `items` muda
  useEffect(() => {
    const initialGroupedItems = groupAndSort(items, undefined, "created_at", "asc");
    setGroupedItems(initialGroupedItems);
  }, [items]);

  // Agrupamento e ordenação dos itens
  const handleGroupAndSort = (groupBy: string | null, sortBy: string, sortOrder: "asc" | "desc") => {
    const itemsToProcess = searchResults.length > 0 ? searchResults : items;
    const groupedData = groupAndSort(itemsToProcess, groupBy as keyof Item, sortBy as keyof Item, sortOrder);
    setGroupedItems(groupedData);
  };

  // Busca de itens
  const handleSearch = async (query: string) => {
    const results = await search(query);
    const filteredResults = results.items.filter((item) => item.list_id === Number(id));
    setSearchResults(filteredResults);
  };

  // Alternar conclusão de um item
  const toggleCompletion = async (item: Item) => {
    const updatedItem = { ...item, completed: !item.completed };

    setGroupedItems((prev) => {
      const updated = { ...prev };
      for (const groupKey in updated) {
        updated[groupKey] = updated[groupKey].map((i) =>
          i.id === item.id ? updatedItem : i
        );
      }
      return updated;
    });

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

  // Adicionar novo item
  const handleAddItemClick = () => {
    setEditItem(null);
    setIsAddEditModalOpen(true);
  };

  // Editar item existente
  const handleEditItemClick = (item: Item) => {
    setEditItem(item);
    setIsAddEditModalOpen(true);
  };

  // Salvar item (novo ou editado)
  const handleSaveItem = async (title: string, dueDate: string | null) => {
    try {
      if (editItem) {
        const updatedItem = { ...editItem, title, due_date: dueDate };
        await updateItem(editItem.list_id, editItem.id, {
          title,
          due_date: dueDate,
        });
        setGroupedItems((prev) => {
          const updated = { ...prev };
          for (const groupKey in updated) {
            updated[groupKey] = updated[groupKey].map((i) =>
              i.id === editItem.id ? updatedItem : i
            );
          }
          return updated;
        });
      } else {
        const newItem = await createItem(Number(id), {
          title,
          due_date: dueDate,
          completed: false,
        });
        if (newItem) {
          setGroupedItems((prev) => ({
            ...prev,
            Todos: [...(prev.Todos || []), newItem],
          }));
        }
      }
      setIsAddEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
    }
  };

  // Lidar com exclusão de item ou lista
  const handleDeleteClick = (id: number, type: "item" | "list") => {
    setModalTarget({ id, type });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (modalTarget) {
      try {
        if (modalTarget.type === "item") {
          await deleteItem(Number(id), modalTarget.id);
          setGroupedItems((prev) => {
            const updated = { ...prev };
            for (const groupKey in updated) {
              updated[groupKey] = updated[groupKey].filter((item) => item.id !== modalTarget.id);
            }
            return updated;
          });
        } else if (modalTarget.type === "list") {
          await removeList(modalTarget.id);
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

        <FiltersBar
          onGroupAndSort={handleGroupAndSort}
          groupOptions={["completed", "due_date", "created_at"]}
          sortOptions={["title", "due_date", "created_at"]}
        />

        <ul className={styles.itemsList}>
          {Object.entries(groupedItems).map(([groupKey, items]) => (
            <div key={groupKey} className={styles.group}>
              <h2>{fieldLabels[groupKey] || groupKey}</h2>
              {items.map((item) => (
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
            </div>
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
