import axios from "axios";
import { List, Item } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Obter todas as listas
export const getLists = async (): Promise<List[]> => {
  const response = await api.get<List[]>("/lists");
  return response.data;
};

// Criar lista
export const createList = async (
  title: string,
  priority: number = 1
): Promise<List> => {
  const response = await axios.post("/lists", {
    title,
    completed: false,
    priority,
  });
  return response.data;
};

// Obter os itens da listas
export const getItemsByListId = async (listId: number): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(`/lists/${listId}/items`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar itens da lista:", error);
    return [];
  }};

export default api;
