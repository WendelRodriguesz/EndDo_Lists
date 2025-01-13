import { useState, useEffect } from "react";
import axios from "../api/axios";
import { List } from "../types";

const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);

  // Listar todas as listas
  const fetchLists = async () => {
    try {
      const response = await axios.get<List[]>("/lists");
      setLists(response.data);
    } catch (error) {
      console.error("Erro ao carregar as listas:", error);
    }
  };

  // Criar uma nova lista
  const createList = async (title: string, priority: number) => {
    try {
      const response = await axios.post<List>("/lists", { title, priority });
      setLists((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao criar a lista:", error);
    }
  };

  // Obter detalhes de uma lista
  const fetchListDetails = async (id: number): Promise<List | null> => {
    try {
      const response = await axios.get<List>(`/lists/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter detalhes da lista:", error);
      return null;
    }
  };

  // Atualizar uma lista
  const updateList = async (id: number, data: Partial<List>) => {
    try {
      const response = await axios.patch<List>(`/lists/${id}`, data);
      setLists((prev) =>
        prev.map((list) => (list.id === id ? response.data : list))
      );
    } catch (error) {
      console.error("Erro ao atualizar a lista:", error);
    }
  };

  // Excluir uma lista
  const deleteList = async (id: number) => {
    try {
      await axios.delete(`/lists/${id}`);
      setLists((prev) => prev.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Erro ao excluir a lista:", error);
    }
  };

  // Carregar listas ao montar o componente
  useEffect(() => {
    fetchLists();
  }, []);

  return { 
    lists, 
    fetchLists, 
    createList, 
    fetchListDetails, 
    updateList, 
    deleteList 
  };
};

export default useLists;
