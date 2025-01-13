import React from "react";
import { List, Item } from "../../types";
import listStyles from "../ListItem/ListItem.module.scss";
import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
  results: { lists: List[]; items: Item[] };
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (!results.lists.length && !results.items.length) {
    return <p className={styles.noResults}>Nenhum resultado encontrado.</p>;
  }

  return (
    <div className={styles.searchResults}>
      <h2>Resultados da Busca:</h2>
      <ul className={styles.resultsList}>
        {results.lists.map((list) => (
          <li
            key={`list-${list.id}`}
            className={`${listStyles.listItem} ${
              list.completed ? listStyles.completed : ""
            } ${listStyles[`priority-${list.priority.toLowerCase()}`]}`}
          >
            <div className={listStyles.listDetails}>
              <h3>{list.title}</h3>
              <p>
                <strong>Prioridade:</strong>{" "}
                <span className={listStyles.priority}>{list.priority}</span>
              </p>
              <p>
                <strong>Categoria:</strong> {list.category}
              </p>
              {results.items.filter((item) => item.list_id === list.id).length >
                0 && (
                <ul className={styles.itemsList}>
                  {results.items
                    .filter((item) => item.list_id === list.id)
                    .map((item) => (
                      <li key={`item-${item.id}`} className={styles.item}>
                        <span className={styles.itemTitle}>{item.title}</span>{" "}
                        <span className={styles.itemCategory}>
                          (Categoria: {item.category})
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;