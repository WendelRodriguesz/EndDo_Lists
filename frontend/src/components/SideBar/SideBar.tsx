import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { PiSidebarSimple } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import SideBarItem from "./SideBarItem";
import { IconType } from "react-icons"; 
import styles from "./SideBar.module.scss";
import ModalAddList from "../ModalAddList/ModalAddList";
import { useNavigate } from "react-router-dom";
import { List } from "../../types";
import { getLists } from "../../api/axios";

type SidebarProps = {
  isVisible: boolean;
  toggleSidebar: () => void;
};

type MenuItem = {
  name: string;
  icon: IconType;
  path: string;
};

const Sidebar: React.FC<SidebarProps> = ({ isVisible, toggleSidebar }) => {
  const menuItems: MenuItem[] = [
    { name: "Buscar", icon: IoSearchOutline, path: "/search" },
    { name: "Home", icon: CiBoxList, path: "/lists" },
  ];
  const [lists, setLists] = useState<List[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddList = async (title: string, priority: number) => {
    console.log("Nova Lista:", { title, priority });
    // Modificar para adicionar a lista no backend
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        setLists(data);
      } catch (error) {
        console.error("Erro ao carregar listas:", error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div
      className={`${styles.sidebar} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.imagesection}>
        <img src={"images/logoEnddo.png"} alt="EndDo Logo" />
        <PiSidebarSimple
          onClick={toggleSidebar}
          className={styles.toggle_button}
        >
          {isVisible ? "<<" : ">>"}
        </PiSidebarSimple>
      </div>
      <div className={styles["menu-items"]}>
        <div
            className={styles.addList}
            onClick={() => setIsModalOpen(true)}
          >
            <IoMdAddCircle size={35} />
            <span>Adicionar lista</span>
          </div>
          <ModalAddList
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddList={handleAddList}
          />
        {menuItems.map((item) => (
          <SideBarItem key={item.name} {...item} />
        ))}
      </div>
      <div className={styles.divider}></div>
      <div className={styles["list-section"]}>
        <h3>Listas</h3>
        <ul>
          {lists.map((list) => (
            <li key={list.id} onClick={() => navigate(`/lists/${list.id}`)}>
              #{list.id} <div className={styles.list_title}>- {list.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
