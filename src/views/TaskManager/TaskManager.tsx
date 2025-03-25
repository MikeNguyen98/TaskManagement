"use client";

import { useTasksQuery } from "@/hooks/useTasksQuery";
import useTaskStore from "@/stores/useTaskStore";
import { useEffect } from "react";
import AddTaskForm from "./sections/AddTaskForm";
import TaskList from "./sections/TaskList";

const TaskManager = () => {
  const { setTasks } = useTaskStore();
  const { data, isLoading, error } = useTasksQuery();

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Task Manager</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  );
};

export default TaskManager;
