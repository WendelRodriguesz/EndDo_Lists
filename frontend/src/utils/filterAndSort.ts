import { List, Item } from "../types";
export const filterAndSort = (
  data: { lists: List[]; items: Item[] },
  filterBy: string,
  sortBy: string,
  sortOrder: "asc" | "desc"
) => {
  const sortData = (array: any[], key: string) => {
    return [...array].sort((a, b) => {
      const valA = a[key] || "";
      const valB = b[key] || "";

      if (sortOrder === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  };

  const filteredLists = filterBy
    ? data.lists.filter((list) => list.title.includes(filterBy))
    : data.lists;

  const filteredItems = filterBy
    ? data.items.filter((item) => item.category.includes(filterBy))
    : data.items;

  return {
    lists: sortData(filteredLists, sortBy),
    items: sortData(filteredItems, sortBy),
  };
};
