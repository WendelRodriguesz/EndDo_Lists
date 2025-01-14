import React, { useState } from "react";
import styles from "./Home.module.scss";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import Layout from "../../components/LayoutPages/Layout";
import List from "../../components/List/List";
import SearchResults from "../../components/SearchResults/SearchResults";
import { List as ListType, Item } from "../../types";
import { useListContext } from "../../utils/contexts/ListContext/ListContext";
import { filterAndSortLists } from "../../utils/filterAndSortLists";
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

  const handleFilterAndSort = (sortBy: string, sortOrder: "asc" | "desc") => {
    if (searchResults.lists.length > 0 || searchResults.items.length > 0) {
      const sortedLists = filterAndSortLists(searchResults.lists, sortBy, sortOrder);
      setSearchResults({
        ...searchResults,
        lists: sortedLists,
      });
    } else {
      const sortedLists = filterAndSortLists(lists, sortBy, sortOrder);
      setGroupedLists({ Todos: sortedLists }); // Renderiza todas as listas sem agrupamento
    }
  };

  const handleClassifyBy = (classifyBy: string) => {
    // Agrupar listas pela classificação escolhida
    const grouped = lists.reduce((acc: Record<string, ListType[]>, list) => {
      const groupKey = list[classifyBy as keyof ListType]?.toString() || "Outros";
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(list);
      return acc;
    }, {});
    setGroupedLists(grouped);
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
        <FiltersBar onFilterAndSort={(sortBy, sortOrder) => handleFilterAndSort(sortBy, sortOrder)} onClassifyBy={handleClassifyBy} />

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
