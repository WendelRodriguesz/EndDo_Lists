import React, { useState } from "react";
import styles from "./InfoLists.module.scss";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import Layout from "../../components/LayoutPages/Layout";
import List from "../../components/List/List";
import SearchResults from "../../components/SearchResults/SearchResults";
import { List as ListType, Item } from "../../types";
import { useListContext } from "../../utils/contexts/ListContext/ListContext";
import { filterAndSortLists } from "../../utils/filterAndSortLists";

import useSearch from "../../hooks/useSearch";

const InfoLists: React.FC = () => {
  const { lists, editList, removeList } = useListContext(); // Obtém todas as listas do contexto
  const { search } = useSearch(); // Hook para buscar resultados
  const [filteredLists, setFilteredLists] = useState<ListType[]>(lists); // Estado para listas filtradas
  const [searchResults, setSearchResults] = useState<{ lists: ListType[]; items: Item[] }>({
    lists: [],
    items: [],
  });

  const handleFilterAndSort = (filterBy: string, sortBy: string, sortOrder: "asc" | "desc") => {
    if (searchResults.lists.length > 0 || searchResults.items.length > 0) {
      // Aplica os filtros nos resultados de busca
      const sortedLists = filterAndSortLists(searchResults.lists, filterBy, sortBy, sortOrder);
      setSearchResults({
        ...searchResults,
        lists: sortedLists,
      });
    } else {
      // Aplica os filtros nas listas principais
      const sortedLists = filterAndSortLists(lists, filterBy, sortBy, sortOrder);
      setFilteredLists(sortedLists);
    }
  };

  const handleSearch = async (query: string) => {
    const results = await search(query);
    setSearchResults(results);
  };

  return (
    <div className={styles.container}>
      <Layout onSearchResults={handleSearch}>
        <FiltersBar onFilterAndSort={handleFilterAndSort} />
        {searchResults.lists.length > 0 || searchResults.items.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : (
          <div>
            <h2>Minhas Listas</h2>
            <List
              lists={filteredLists.length > 0 ? filteredLists : lists}
              onEdit={editList}
              onDelete={removeList}
            />
          </div>
        )}
      </Layout>
    </div>
  );
};

export default InfoLists;
