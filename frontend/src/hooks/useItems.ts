import { useState } from "react";
import axios from "../api/axios";
import { Item } from "../types";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  // Listar itens de uma lista
  const fetchItems = async (listId: number) => {
    try {
      const response = await axios.get<Item[]>(`/lists/${listId}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao carregar os itens:", error);
    }
  };

  // Adicionar um item a uma lista
  const createItem = async (listId: number, data: Partial<Item>) => {
    try {
      const response = await axios.post<Item>(`/lists/${listId}/items`, data);
      setItems((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao criar o item:", error);
    }
  };

  // Atualizar um item
  const updateItem = async (
    listId: number,
    itemId: number,
    data: Partial<Item>
  ) => {
    try {
      const response = await axios.patch<Item>(
        `/lists/${listId}/items/${itemId}`,
        data
      );
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? response.data : item))
      );
    } catch (error) {
      console.error("Erro ao atualizar o item:", error);
    }
  };

  // Excluir um item
  const deleteItem = async (listId: number, itemId: number) => {
    try {
      await axios.delete(`/lists/${listId}/items/${itemId}`);
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  };

  // Contar itens por lista
  const countItemsInList = async (listId: number): Promise<number> => {
    try {
      const response = await axios.get<Item[]>(`/lists/${listId}/items`);
      return response.data.length;
    } catch (error) {
      console.error("Erro ao contar os itens:", error);
      return 0;
    }
  };

  return {
    items,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    countItemsInList,
  };
};

export default useItems;
