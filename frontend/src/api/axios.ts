import axios from "axios";
import { List, Item } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000", // Certifique-se de que esta URL é a mesma do backend
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
  const response = await api.post<List>("/lists", {
    title,
    completed: false,
    priority,
  });
  return response.data;
};

    // Atualizar uma lista 
  export const updateList = async (id: number, data: Partial<List>): Promise<List> => {
    const response = await api.patch<List>(`/lists/${id}`, data);
    return response.data;
  };


  // Excluir uma lista
  export const deleteList = async (id: number): Promise<void> => {
    await api.delete(`/lists/${id}`);
  };


// Obter os itens de uma lista específica
export const getItemsByListId = async (listId: number): Promise<Item[]> => {
  try {
    const response = await api.get<Item[]>(`/lists/${listId}/items`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar itens da lista:", error);
    return [];
  }
};

// Função de busca (listas e itens)
export const searchListsAndItems = async (
  query: string
): Promise<{ lists: List[]; items: Item[] }> => {
  try {
    const response = await api.get<{ lists: List[]; items: Item[] }>("/search", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar listas e itens:", error);
    return { lists: [], items: [] }; // Retorna resultados vazios em caso de erro
  }
};

export default api;
