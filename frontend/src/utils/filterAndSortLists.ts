import { List } from "../types";

export const filterAndSortLists = (
  lists: List[],
  filterBy: string,
  sortBy: string,
  sortOrder: "asc" | "desc"
): List[] => {
  // Mapeamento de prioridades para valores numéricos
  const priorityWeights: Record<string, number> = {
    Baixa: 1,
    Média: 2,
    Importante: 3,
    Urgente: 4,
  };

  // Função para ordenar as listas
  const sortData = (array: List[], key: keyof List) => {
    return [...array].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Considerar os pesos para o campo "priority"
      if (key === "priority") {
        valA = priorityWeights[a[key] as string] || 0;
        valB = priorityWeights[b[key] as string] || 0;
      }

      if (sortOrder === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  };

  // Filtrar as listas
  const filteredLists = filterBy
    ? lists.filter((list) =>
        list.title.toLowerCase().includes(filterBy.toLowerCase())
      )
    : lists;

  // Ordenar as listas
  return sortData(filteredLists, sortBy as keyof List);
};
