import { useState } from "react";
import axios from "../api/axios";
import { List, Item } from "../types";

const useSearch = () => {
  const [results, setResults] = useState<{ lists: List[]; items: Item[] }>({
    lists: [],
    items: [],
  });

  const search = async (query: string): Promise<{ lists: List[]; items: Item[] }> => {
    if (!query.trim()) {
      const emptyResults = { lists: [], items: [] };
      setResults(emptyResults);
      return emptyResults; // Retorna resultados vazios
    }

    try {
      const response = await axios.get("/api/search", { params: { query } });
      const data = response.data;
      setResults(data);
      return data; // Retorna os resultados da API
    } catch (error) {
      console.error("Erro ao buscar:", error);
      const emptyResults = { lists: [], items: [] };
      setResults(emptyResults);
      return emptyResults; // Retorna resultados vazios em caso de erro
    }
  };

  return { results, search };
};

export default useSearch;
