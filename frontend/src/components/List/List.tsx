import React from "react";
import styles from "./List.module.scss";
import { List as ListType } from "../../types";
import ListItem from "../ListItem/ListItem";
import { deleteList, updateList } from "../../api/axios";

interface ListProps {
  lists: ListType[];
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
}

const List: React.FC<ListProps> = ({ lists, setLists }) => {
  const handleEdit = async (id: number, data: Partial<ListType>) => {
    try {
      const updatedList = await updateList(id, data);
      setLists((prevLists) =>
        prevLists.map((list) => (list.id === id ? updatedList : list))
      );
    } catch (error) {
      console.error("Erro ao editar lista:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteList(id);
      setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Erro ao excluir lista:", error);
    }
  };

  return (
    <ul className={styles.list}>
      {lists.map((list) => (
        <ListItem
          key={list.id}
          list={list}
          onEdit={handleEdit}
          onDelete={handleDelete}
          itemCount={5} // Substitua pelo número real de itens
        />
      ))}
    </ul>
  );
};

export default List;
