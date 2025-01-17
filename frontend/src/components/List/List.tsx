import React from "react";
import styles from "./List.module.scss";
import { List as ListType } from "../../types";
import ListDetail from "../ListDetail/ListDetail";

interface ListProps {
  lists: ListType[];
  onEdit: (id: number, data: Partial<ListType>) => void;
  onDelete: (id: number) => void;
}

const List: React.FC<ListProps> = ({ lists, onEdit, onDelete }) => {
  return (
    <ul className={styles.list}>
      {lists.map((list) => (
        <ListDetail
          key={list.id}
          list={list}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default List;
