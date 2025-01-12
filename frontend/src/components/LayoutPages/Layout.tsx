import React, { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className={styles.mainLayout}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
