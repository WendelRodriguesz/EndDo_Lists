import axios from "axios";
import { List } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getLists = async (): Promise<List[]> => {
  const response = await api.get<List[]>("/lists");
  return response.data;
};

export default api;
