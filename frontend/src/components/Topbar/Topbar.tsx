import React, { useState } from "react";
import styles from "./Topbar.module.scss";
import { IoSearchCircle } from "react-icons/io5";

interface TopbarProps {
  isSidebarVisible: boolean;
  onSearch: (query: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({ isSidebarVisible, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Envia o valor para a função de busca
  };

  return (
    <div
      className={`${styles.topbar} ${
        isSidebarVisible ? styles.sidebarVisible : styles.sidebarHidden
      }`}
    >
      <img src={"images/logoBEnddo.png"} alt="EndDo Logo" />
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Buscar listas ou itens..."
        />
        <a className={styles.IconSearch}><IoSearchCircle size={'40px'}/></a>
      </div>
    </div>
  );
};

export default Topbar;
