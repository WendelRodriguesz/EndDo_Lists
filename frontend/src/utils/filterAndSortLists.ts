import { List } from "../types";

export const filterAndSortLists = (
  lists: List[],
  filterBy: string,
  sortBy: string,
  sortOrder: "asc" | "desc"
): List[] => {
  // Função para ordenar as listas
  const sortData = (array: List[], key: keyof List) => {
    return [...array].sort((a, b) => {
      const valA = a[key] || "";
      const valB = b[key] || "";

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
