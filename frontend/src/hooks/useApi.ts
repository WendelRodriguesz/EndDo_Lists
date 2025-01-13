import axios from "../api/axios";

const useApi = () => {
  const request = async <T>(
    method: "get" | "post" | "patch" | "delete",
    url: string,
    data?: any
  ): Promise<T | null> => {
    try {
      const response = await axios({ method, url, data });
      return response.data;
    } catch (error) {
      console.error(`Erro ao executar ${method.toUpperCase()} em ${url}:`, error);
      return null;
    }
  };

  return { request };
};

export default useApi;
