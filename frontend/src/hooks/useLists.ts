import { useState, useEffect } from "react";
import useApi from "./useApi";
import { List } from "../types";

const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const { request } = useApi();

  const fetchLists = async () => {
    const data = await request<List[]>("get", "/lists");
    if (data) setLists(data);
  };

  const createList = async (title: string, priority: number) => {
    const data = await request<List>("post", "/lists", { title, priority });
    if (data) setLists((prev) => [...prev, data]);
  };

  const fetchListDetails = async (id: number): Promise<List | null> => {
    return await request<List>("get", `/lists/${id}`);
  };

  const updateList = async (id: number, updates: Partial<List>) => {
    const data = await request<List>("patch", `/lists/${id}`, updates);
    if (data) {
      setLists((prev) =>
        prev.map((list) => (list.id === id ? data : list))
      );
    }
  };

  const deleteList = async (id: number) => {
    const success = await request<null>("delete", `/lists/${id}`);
    if (success !== null) {
      setLists((prev) => prev.filter((list) => list.id !== id));
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return { lists, fetchLists, createList, fetchListDetails, updateList, deleteList };
};

export default useLists;
