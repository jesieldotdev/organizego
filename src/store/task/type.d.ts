type TaskState = {
  items: TaskItem[]
  selectedItemIndex: number;
  searchText: string;
  filter: {
    task: {
      filter: SearchFilter<TaskItem>;
      data: PaginatedResponse<TaskItem>;
    };
  };

  taskModalTable: boolean
}

type TaskItem = {
  title: string;
  description: string;
  start_date: null;
  end_date: null;
  status?: "incomplete" | "completed";
  id: number | string;
  created_at: string;
  tags: string[];
  author_id: string;
}