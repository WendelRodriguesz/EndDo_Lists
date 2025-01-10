import React from "react";
import styles from "./ListItem.module.scss";
import { List } from "../../types";

interface ListItemProps {
  list: List;
}

const ListItem: React.FC<ListItemProps> = ({ list }) => {
  return (
    <li className={styles.listItem}>
      <strong>{list.title}</strong> (Prioridade: {list.priority})
      <p>Status: {list.completed ? "Concluída" : "Pendente"}</p>
    </li>
  );
};

export default ListItem;
