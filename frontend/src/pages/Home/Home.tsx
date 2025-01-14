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
  const [filteredLists, setFilteredLists] = useState<ListType[]>(lists);
  const [searchResults, setSearchResults] = useState<{ lists: ListType[]; items: Item[] }>({
    lists: [],
    items: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [modalTarget, setModalTarget] = useState<ListType | null>(null); // Lista selecionada para exclusão

  const handleFilterAndSort = (filterBy: string, sortBy: string, sortOrder: "asc" | "desc") => {
    if (searchResults.lists.length > 0 || searchResults.items.length > 0) {
      const sortedLists = filterAndSortLists(searchResults.lists, filterBy, sortBy, sortOrder);
      setSearchResults({
        ...searchResults,
        lists: sortedLists,
      });
    } else {
      const sortedLists = filterAndSortLists(lists, filterBy, sortBy, sortOrder);
      setFilteredLists(sortedLists);
    }
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
      setFilteredLists((prev) => prev.filter((list) => list.id !== modalTarget.id)); // Atualiza listas filtradas
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
        <FiltersBar onFilterAndSort={handleFilterAndSort} />
        {searchResults.lists.length > 0 || searchResults.items.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : (
          <div>
            <List
              lists={filteredLists.length > 0 ? filteredLists : lists}
              onEdit={editList}
              onDelete={handleDeleteClick} // Usa o modal ao deletar
            />
          </div>
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
