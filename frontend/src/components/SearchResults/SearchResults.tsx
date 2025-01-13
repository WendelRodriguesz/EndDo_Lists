import React from "react";
import { List, Item } from "../../types";
import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
  results: { lists: List[]; items: Item[] };
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className={styles.searchResults}>
      <h2>Resultados da Busca:</h2>
      <ul>
        {results.lists.map((list) => (
          <li key={`list-${list.id}`}>Lista: {list.title}</li>
        ))}
        {results.items.map((item) => (
          <li key={`item-${item.id}`}>
            Item: {item.title} (Categoria: {item.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
