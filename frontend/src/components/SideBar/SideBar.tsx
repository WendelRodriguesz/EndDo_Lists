import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { PiSidebarSimple } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import SideBarItem  from "./SideBarItem";
import { IconType } from "react-icons"; 
import styles from "./SideBar.module.scss";
import { NavLink } from "react-router-dom";


type MenuItem = {
  name: string;
  icon: IconType; // Tipo para componentes de ícone
  path: string;
};

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { name: "Buscar", icon: IoSearchOutline, path: "/search" },
    { name: "Home", icon: CiBoxList, path: "/lists" },
  ];

  return (
    <div className={styles["sidebar"]}>
      <div className={styles.imagesection}>
          <img src={"images/logov360.png"} alt="v360 Logo" />
          <PiSidebarSimple className={styles.show}/>
      </div>
      <div className={styles["menu-items"]}>
        {/* <div className="addList"> */}
          <NavLink
            to={"/lists"}
            // onClick={""}
            className={styles.addList}
          >
          <IoMdAddCircle size={35} />
          <span>Adicionar lista</span>
          </NavLink>
        {/* </div> */}
        {menuItems.map((item) => (
          <SideBarItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
