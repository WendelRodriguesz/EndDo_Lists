import { useContext } from "react";
import { ListContext } from "../utils/contexts/ListContext/ListContext"; // Ajuste o caminho para o contexto

const useLists = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useLists deve ser usado dentro de ListProvider");
  }
  return context;
};

export default useLists;
