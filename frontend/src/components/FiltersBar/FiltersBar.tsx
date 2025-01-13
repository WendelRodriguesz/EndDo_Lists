import React, { useState } from "react";
import { FaArrowUpShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import styles from "./FiltersBar.module.scss";
// import { filterAndSort } from "../../utils/filterAndSort";

interface FiltersBarProps {
  onFilterAndSort: (
    filterBy: string,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ) => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({ onFilterAndSort }) => {
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterAndSort(filterBy, value, sortOrder);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterBy(value);
    onFilterAndSort(value, sortBy, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onFilterAndSort(filterBy, sortBy, newOrder);
  };

  return (
    <div className={styles.filtersBar}>
      <div className={styles.filterSection}>
        <label>Classificar por:</label>
        <select value={filterBy} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="category">Categoria</option>
          <option value="priority">Prioridade</option>
        </select>
      </div>
      <div className={styles.sortSection}>
        <label>Ordenar por:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Data de Criação</option>
          <option value="due_date">Data de Término</option>
          <option value="priority">Prioridade</option>
          <option value="title">Título</option>
        </select>
        <button className={styles.sortOrderButton} onClick={toggleSortOrder}>
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
