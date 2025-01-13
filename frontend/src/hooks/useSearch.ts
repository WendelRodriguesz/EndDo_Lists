import { useState } from "react";
import axios from "../api/axios";
import { List, Item } from "../types";

const useSearch = () => {
  const [results] = useState<{ lists: List[]; items: Item[] }>({
    lists: [],
    items: [],
  });

  const search = async (query: string): Promise<{ lists: List[]; items: Item[] }> => {
    if (!query.trim()) {
      return { lists: [], items: [] };
    }
  
    try {
      const listsResponse = await axios.get("/lists"); // Carrega todas as listas
      const lists = listsResponse.data;
  
      const itemsPromises = lists.map(async (list: List) => {
        const response = await axios.get(`/lists/${list.id}/items`); // Carrega itens de cada lista
        return response.data;
      });
  
      const items = (await Promise.all(itemsPromises)).flat(); // Une os itens de todas as listas
  
      const filteredData = {
        lists: lists.filter((list: List) =>
          list.title.toLowerCase().includes(query.toLowerCase())
        ),
        items: items.filter((item: Item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        ),
      };
  
      return filteredData;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return { lists: [], items: [] };
    }
  };

  return { results, search };
};

export default useSearch;
