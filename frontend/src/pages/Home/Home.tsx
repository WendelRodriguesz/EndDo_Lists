import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import Layout from "../../components/LayoutPages/Layout";
import List from "../../components/List/List";
import SearchResults from "../../components/SearchResults/SearchResults";
import { List as ListType, Item } from "../../types"; // Import the List type correctly
import { useListContext } from "../../utils/contexts/ListContext/ListContext";
import { groupAndSort } from "../../utils/groupAndSort";
import DeleteModal from "../../components/DeleteModal/DeleteModal"; // Modal de exclusão
import useSearch from "../../hooks/useSearch";

const Home: React.FC = () => {
  const { lists, editList, removeList } = useListContext();
  const { search } = useSearch();
  const [groupedLists, setGroupedLists] = useState<Record<string, ListType[]>>({});
  const [searchResults, setSearchResults] = useState<{ lists: ListType[]; items: Item[] }>({
    lists: [],
    items: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [modalTarget, setModalTarget] = useState<ListType | null>(null); // Lista selecionada para exclusão

  useEffect(() => {
    const initialGroupedLists = groupAndSort(lists, undefined, "created_at", "asc");
    setGroupedLists(initialGroupedLists);
  }, [lists]);

  const handleGroupAndSort = (
    groupBy: string | null,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ) => {
    const groupedData = groupAndSort(lists, groupBy as keyof ListType | undefined, sortBy as keyof ListType | undefined, sortOrder);
    setGroupedLists(groupedData);
  };

  const handleSearch = async (query: string) => {
    const results = await search(query);
    setSearchResults(results);
  };

  const handleDeleteClick = (id: number) => {
    const list = lists.find((list) => list.id === id) || null;
    setModalTarget(list);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (modalTarget) {
      removeList(modalTarget.id); // Remove a lista do contexto
      setGroupedLists((prev) => {
        const updated = { ...prev };
        for (const groupKey in updated) {
          updated[groupKey] = updated[groupKey].filter((list) => list.id !== modalTarget.id);
          if (updated[groupKey].length === 0) delete updated[groupKey];
        }
        return updated;
      });
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setModalTarget(null);
  };

  return (
    <div className={styles.container}>
      <Layout onSearchResults={handleSearch}>
        <h1>Minhas Listas</h1>
        <FiltersBar
          onGroupAndSort={handleGroupAndSort}
          groupOptions={["priority", "category", "completed"]}
          sortOptions={["priority", "item_count", "title","created_at", "updated_at"]}
        />

        {searchResults.lists.length > 0 || searchResults.items.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : Object.keys(groupedLists).length > 0 ? (
          // Renderiza as listas agrupadas
          Object.entries(groupedLists).map(([group, lists]) => (
            <div key={group} className={styles.group}>
              <h2>{group}</h2>
              <List
                lists={lists}
                onEdit={editList}
                onDelete={handleDeleteClick} // Usa o modal ao deletar
              />
            </div>
          ))
        ) : (
          <p>Nenhuma lista encontrada</p>
        )}
      </Layout>

      {isModalOpen && modalTarget && (
        <DeleteModal
          title="Confirmar Exclusão"
          description={`Tem certeza que deseja excluir a lista "${modalTarget.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Home;
