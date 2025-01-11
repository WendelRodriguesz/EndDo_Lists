import React, { useEffect, useState} from "react";
import { IoMdAddCircle } from "react-icons/io";
import { PiSidebarSimple } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import SideBarItem  from "./SideBarItem";
import { IconType } from "react-icons"; 
import styles from "./SideBar.module.scss";
import { NavLink } from "react-router-dom";
import { List } from "../../types";
import { useNavigate } from "react-router-dom";
import { getLists} from "../../api/axios";


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
  const [lists, setLists] = useState<List[]>([]);
  const navigate = useNavigate();

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
      <div className={styles.divider}></div>
      <div className={styles["list-section"]}>
        <h3>Listas</h3>
        <ul>
          {lists.map((list) => (
            <li key={list.id} onClick={() => navigate(`/lists/${list.id}`)}>
              {list.title}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
