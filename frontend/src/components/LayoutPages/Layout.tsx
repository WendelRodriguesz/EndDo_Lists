import React, { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import Topbar from "../Topbar/Topbar";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
  onSearchResults: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onSearchResults }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`${styles.layout} ${
        isSidebarVisible ? styles["sidebar-visible"] : styles["sidebar-hidden"]
      }`}
    >
      <Topbar isSidebarVisible={isSidebarVisible} onSearch={onSearchResults} />
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className={styles.mainLayout}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
