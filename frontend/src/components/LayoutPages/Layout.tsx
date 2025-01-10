import React, { ReactNode } from "react";
import Sidebar from "../SideBar/SideBar";
// import Topbar from "../Topbar/Topbar";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) =>  {
  return (
    <div className={styles.layout}>
      {/* <Topbar /> */}
      <div className={styles.mainLayout}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
);
}

export default Layout;
