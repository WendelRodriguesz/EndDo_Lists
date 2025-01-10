import React from "react";
import { NavLink } from "react-router-dom";
import { IconType } from "react-icons"; 
import styles from "./SideBar.module.scss";

type SidebarItemProps = {
  name: string; // Nome do item da sidebar
  icon: IconType; // Tipo para ícones (React-icons)
  path: string; // Caminho para a rota
  className?: string; // Classe CSS opcional
};

const SidebarItem: React.FC<SidebarItemProps> = ({ name, icon: Icon, path, className = "" }) => {

  const handleLogout = () => {
    
  };

  return (
    <NavLink
      to={path}
      onClick={handleLogout}
      className={({ isActive }) =>
        `${styles['sidebar-item']} ${isActive ? styles['active'] : ''}`
      }
    >
      <div className={styles["icon-wrapper"]}>
        <Icon size={20} />
      </div>
      {name && <span>{name}</span>}
    </NavLink>
  );
};

export default SidebarItem;
