import React, { useState } from "react";
import { FaArrowUpShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import { fieldLabels } from "../../utils/labels"; // Importe o mapeamento de rótulos
import styles from "./FiltersBar.module.scss";

interface FiltersBarProps {
  onGroupAndSort: (
    groupBy: string | null,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ) => void;
  groupOptions: string[]; // Propriedades para agrupar
  sortOptions: string[];  // Propriedades para ordenar
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  onGroupAndSort,
  groupOptions,
  sortOptions,
}) => {
  const [groupBy, setGroupBy] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setGroupBy(value || null);
    onGroupAndSort(value || null, sortBy, sortOrder);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onGroupAndSort(groupBy, value, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onGroupAndSort(groupBy, sortBy, newOrder);
  };

  return (
    <div className={styles.filtersBar}>
      <div className={styles.filterSection}>
        <label>Agrupar por:</label>
        <select value={groupBy || ""} onChange={handleGroupChange}>
          <option value="">Nenhum</option>
          {groupOptions.map((option) => (
            <option key={option} value={option}>
              {fieldLabels[option] || option}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.sortSection}>
        <label>Ordenar por:</label>
        <select value={sortBy} onChange={handleSortChange}>
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {fieldLabels[option] || option}
            </option>
          ))}
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
