import React, { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import Topbar from "../Topbar/Topbar";
import styles from "./Layout.module.scss"
import axios from "../../api/axios";
import { List, Item } from "../../types";

interface LayoutProps {
  children: React.ReactNode;
  onSearchResults: (results: { lists: List[]; items: Item[] }) => void; // Prop para repassar os resultados da busca
}

const Layout: React.FC<LayoutProps> = ({ children, onSearchResults }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSearch = async (query: string) => {
    // Aqui chamamos a função de busca da API e repassamos os resultados para o pai
    if (query.trim() === "") {
      onSearchResults({ lists: [], items: [] }); // Reseta os resultados se a busca estiver vazia
      return;
    }

    try {
      const response = await axios.get("/api/search", {
        params: { query },
      });

      const { lists, items } = response.data;
      onSearchResults({ lists, items }); // Envia os resultados para o componente pai
    } catch (error) {
      console.error("Erro ao buscar:", error);
      onSearchResults({ lists: [], items: [] }); // Retorna vazio em caso de erro
    }
  };

  return (
    <div
      className={`${styles.layout} ${
        isSidebarVisible ? styles["sidebar-visible"] : styles["sidebar-hidden"]
      }`}
    >
      <Topbar isSidebarVisible={isSidebarVisible} onSearch={handleSearch} />
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className={styles.mainLayout}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
