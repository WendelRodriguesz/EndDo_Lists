export interface List {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  category: string;
  item_count: number;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: number;
  title: string;
  completed: boolean;
  due_date: string;
  list_id: number;
  created_at: string;
  updated_at: string;
}
