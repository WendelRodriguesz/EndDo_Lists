import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { List } from "../../types";
import { getLists, createList, updateList, deleteList } from "../../api/axios";

interface ListContextProps {
  lists: List[];
  fetchLists: () => void;
  addList: (title: string, priority: number) => void;
  editList: (id: number, data: Partial<List>) => void;
  removeList: (id: number) => void;
}

const ListContext = createContext<ListContextProps | undefined>(undefined);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<List[]>([]);

  // Carregar listas da API
  const fetchLists = async () => {
    try {
      const data = await getLists();
      setLists(data);
    } catch (error) {
      console.error("Erro ao carregar listas:", error);
    }
  };

  // Adicionar uma lista
  const addList = async (title: string, priority: number) => {
    try {
      const newList = await createList(title, priority);
      setLists((prevLists) => [...prevLists, newList]);
    } catch (error) {
      console.error("Erro ao adicionar lista:", error);
    }
  };

  // Editar uma lista
  const editList = async (id: number, data: Partial<List>) => {
    try {
      const updatedList = await updateList(id, data);
      setLists((prevLists) =>
        prevLists.map((list) => (list.id === id ? updatedList : list))
      );
    } catch (error) {
      console.error("Erro ao editar lista:", error);
    }
  };

  // Remover uma lista
  const removeList = async (id: number) => {
    try {
      await deleteList(id);
      setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Erro ao remover lista:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <ListContext.Provider value={{ lists, fetchLists, addList, editList, removeList }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useListContext deve ser usado dentro de ListProvider");
  }
  return context;
};
