export interface List {
    id: number;
    title: string;
    completed: boolean;
    priority: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Item {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    category: string;
    due_date: string;
    list_id: number;
    created_at: string;
    updated_at: string;
  }