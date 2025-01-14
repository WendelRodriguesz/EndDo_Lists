import { Item } from "../types";

export const filterAndSortItems = (
  items: Item[],
  filterBy: string,
  sortBy: string,
  sortOrder: "asc" | "desc"
): Item[] => {
  // Função para ordenar os itens
  const sortData = (array: Item[], key: keyof Item) => {
    return [...array].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      if (sortOrder === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  };

  // Filtrar os itens
  const filteredItems = filterBy
    ? items.filter((item) =>
        item.title.toLowerCase().includes(filterBy.toLowerCase())
      )
    : items;

  // Ordenar os itens
  return sortData(filteredItems, sortBy as keyof Item);
};
