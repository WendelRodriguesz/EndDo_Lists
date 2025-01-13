import React,  { useEffect, useState }  from "react";
import styles from "./List.module.scss";
import { List as ListType } from "../../types";
import ListItem from "../ListItem/ListItem";
import useItems from "../../hooks/useItems";

interface ListProps {
  lists: ListType[];
  onEdit: (id: number, data: Partial<ListType>) => void;
  onDelete: (id: number) => void;
}

const List: React.FC<ListProps> = ({ lists, onEdit, onDelete }) => {
  const { countItemsInList } = useItems();
  const [itemCounts, setItemCounts] = useState<Record<number, number>>({});

  useEffect(() => {
  const fetchCounts = async () => {
    for (const list of lists) {
      const count = await countItemsInList(list.id);
      setItemCounts((prev) => ({
        ...prev,
        [list.id]: count,
      }));
    }
  };

  fetchCounts();
  }, [lists, countItemsInList]);

  return (
    <ul className={styles.list}>
      {lists.map((list) => (
        <ListItem
          key={list.id}
          list={list}
          onEdit={onEdit}
          onDelete={onDelete}
          itemCount={itemCounts[list.id] || 0} 
        />
      ))}
    </ul>
  );
};

export default List;
