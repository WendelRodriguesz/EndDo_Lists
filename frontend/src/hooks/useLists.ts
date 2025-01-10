import { useState, useEffect } from "react";
import { getLists, createList } from "../api/axios";
import { List } from "../types";

export const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        setLists(data);
      } catch (error) {
        console.error("Erro ao carregar as listas:", error);
      }
    };

    fetchLists();
  }, []);

  const addList = async (title: string, priority: number) => {
    try {
      const newList = await createList(title, priority);
      setLists((prev) => [...prev, newList]);
    } catch (error) {
      console.error("Erro ao criar a lista:", error);
    }
  };

  return { lists, addList };
};
