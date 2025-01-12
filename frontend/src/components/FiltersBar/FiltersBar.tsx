import React, { useState } from "react";
import { FaArrowUpShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import styles from "./FiltersBar.module.scss";

interface FiltersBarProps {
  onSort: (sortBy: string, order: string) => void;
  onFilter: (filterBy: string) => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({ onSort, onFilter }) => {
  const [selectedSort, setSelectedSort] = useState("created_at");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Estado para o sentido da ordenação

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSort(value);
    onSort(value, sortOrder); // Envia o critério e a ordem ao pai
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFilter(value);
    onFilter(value); // Envia o critério de filtro ao pai
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSort(selectedSort, newOrder); // Atualiza a ordenação com a nova ordem
  };

  return (
    <div className={styles.filtersBar}>
     
      <div className={styles.filterSection}>
        <label htmlFor="filter">Classificar por:</label>
        <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="category">Categoria</option>
          <option value="priority">Prioridade</option>
        </select>
      </div> 
      <div className={styles.sortSection}>
        <label htmlFor="sort">Ordenar por:</label>
        <select id="sort" value={selectedSort} onChange={handleSortChange}>
          <option value="created_at">Data de criação</option>
          <option value="due_date">Data de término</option>
          <option value="priority">Prioridade</option>
          <option value="alphabetical">Ordem alfabética</option>
        </select>
        <button
          type="button"
          className={styles.sortOrderButton}
          onClick={toggleSortOrder}
        >
          {sortOrder === "asc" ? (
            <FaArrowUpShortWide size={15} />
          ) : (
            <FaArrowDownWideShort size={15} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;
