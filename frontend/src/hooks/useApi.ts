import axios, { Method } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const useApi = () => {
  const request = async <T>(
    method: Method,
    url: string,
    data?: Record<string, unknown>
  ): Promise<T | null> => {
    try {
      const response = await api.request<T>({
        method,
        url,
        data,
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro na requisição:", error.response || error.message);
      return null;
    }
  };

  return { request };
};

export default useApi;
