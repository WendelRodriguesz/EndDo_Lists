import React, { useState } from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          {isSidebarOpen ? "<<" : ">>"}
        </button>
        <nav>
          <ul>
            <li>Hoje</li>
            <li>Meus Projetos</li>
            <li>Equipe</li>
          </ul>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Hoje</h1>
        </header>
        <section>{children}</section>
      </main>
    </div>
  );
};

export default Layout;
