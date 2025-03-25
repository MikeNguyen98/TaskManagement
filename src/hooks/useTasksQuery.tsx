import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
};

export const useTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry on failure
  });
};
