import axios from "axios";
import { List } from "../types";

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

export default api;
