import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { List } from "../../../types";
import { getLists, createList, updateList, deleteList } from "../../../api/axios";

interface ListContextProps {
  lists: List[];
  fetchLists: () => void;
  addList: (title: string, priority: string, category: string) => void;
  editList: (id: number, data: Partial<List>) => void;
  removeList: (id: number) => void;
  getItemsByListId: (listId: number) => Promise<any[]>;
}

export const ListContext = createContext<ListContextProps | undefined>(undefined);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [isFetched, setIsFetched] = useState(false); // Flag para evitar chamadas repetidas

  const fetchLists = async () => {
    if (!isFetched) {
      try {
        const data = await getLists();
        setLists(data);
        setIsFetched(true);
      } catch (error) {
        console.error("Erro ao carregar listas:", error);
      }
    }
  };

  const addList = async (title: string, priority: string, category: string) => {
    try {
      const newList = await createList(title, priority, category);
      setLists((prev) => [...prev, newList]);
    } catch (error) {
      console.error("Erro ao adicionar lista:", error);
    }
  };

  const editList = async (id: number, data: Partial<List>) => {
    try {
      const updatedList = await updateList(id, data);
      setLists((prev) =>
        prev.map((list) => (list.id === id ? updatedList : list))
      );
    } catch (error) {
      console.error("Erro ao editar lista:", error);
    }
  };

  const removeList = async (id: number) => {
    try {
      await deleteList(id);
      setLists((prev) => prev.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Erro ao remover lista:", error);
    }
  };

  const getItemsByListId = async (listId: number) => {
    try {
      const items = await fetch(`/api/lists/${listId}/items`); // Ajuste para sua API
      return items.json();
    } catch (error) {
      console.error("Erro ao buscar itens da lista:", error);
      return [];
    }
  };
  

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <ListContext.Provider value={{ lists, fetchLists, addList, editList, removeList, getItemsByListId}}>
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
