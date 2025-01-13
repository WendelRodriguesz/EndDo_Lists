import axios, { AxiosRequestConfig } from "axios";

const useApi = () => {
  const request = async <T>(method: AxiosRequestConfig["method"], url: string, data?: any): Promise<T | null> => {
    try {
      const response = await axios({ method, url, data });
      return response.data;
    } catch (error) {
      console.error(`Erro na requisição ${method?.toUpperCase()} ${url}:`, error);
      return null;
    }
  };

  return { request };
};

export default useApi;
