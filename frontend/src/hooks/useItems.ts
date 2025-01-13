import { useState } from "react";
import useApi from "./useApi";
import { Item } from "../types";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { request } = useApi();

  const fetchItems = async (listId: number) => {
    const data = await request<Item[]>("get", `/lists/${listId}/items`);
    if (data) setItems(data);
  };

  const createItem = async (listId: number, item: Partial<Item>) => {
    const data = await request<Item>("post", `/lists/${listId}/items`, item);
    if (data) setItems((prev) => [...prev, data]);
  };

  const updateItem = async (listId: number, itemId: number, updates: Partial<Item>) => {
    const data = await request<Item>("patch", `/lists/${listId}/items/${itemId}`, updates);
    if (data) {
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? data : item))
      );
    }
  };

  const deleteItem = async (listId: number, itemId: number) => {
    const success = await request<null>("delete", `/lists/${listId}/items/${itemId}`);
    if (success !== null) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  return { items, fetchItems, createItem, updateItem, deleteItem };
};

export default useItems;
