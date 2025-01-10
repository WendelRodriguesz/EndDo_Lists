import React from "react";
import styles from "./List.module.scss";
import { List as ListType } from "../../types";
import ListItem from "../ListItem/ListItem";

interface ListProps {
  lists: ListType[];
}

const List: React.FC<ListProps> = ({ lists }) => {
  return (
    <ul className={styles.list}>
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
    </ul>
  );
};

export default List;
