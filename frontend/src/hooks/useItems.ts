import { useState } from "react";
import useApi from "./useApi";
import { Item } from "../types";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { request } = useApi();

  // Buscar todos os itens de uma lista
  const fetchItems = async (listId: number) => {
    try {
      const data = await request<Item[]>("get", `/lists/${listId}/items`);
      if (data) setItems(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  // Criar um novo item em uma lista
  const createItem = async (listId: number, item: Partial<Item>): Promise<Item | null> => {
    try {
      const data = await request<Item>("post", `/lists/${listId}/items`, item);
      if (data) {
        setItems((prev) => [...prev, data]); // Atualiza o estado apenas se os dados forem válidos
        return data;
      }
      console.error("Resposta inválida ao criar item.");
      return null; // Retorna null caso os dados sejam inválidos
    } catch (error) {
      console.error("Erro ao criar item:", error);
      return null; // Retorna null em caso de erro
    }
  };

  // Atualizar um item existente em uma lista
  const updateItem = async (listId: number, itemId: number, updates: Partial<Item>) => {
    try {
      const data = await request<Item>("patch", `/lists/${listId}/items/${itemId}`, updates);
      if (data) {
        setItems((prev) =>
          prev.map((item) => (item.id === itemId ? data : item))
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  // Deletar um item de uma lista
  const deleteItem = async (listId: number, itemId: number) => {
    try {
      const success = await request<null>("delete", `/lists/${listId}/items/${itemId}`);
      if (success !== null) {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  // Retornar os métodos e o estado
  return { items, setItems, fetchItems, createItem, updateItem, deleteItem };
};

export default useItems;
