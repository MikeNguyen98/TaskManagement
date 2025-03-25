import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  reorderTask: (sourceIndex: number, destinationIndex: number) => void;
}

const useTaskStore = create<TaskStore>(
  (
    set: (
      partial: Partial<TaskStore> | ((state: TaskStore) => Partial<TaskStore>)
    ) => void
  ) => ({
    tasks: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("tasks") || "[]") : [],
    setTasks: (tasks: Task[]) => {
      set({ tasks });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    addTask: (task: Task) =>
      set((state: TaskStore) => {
        const updatedTasks = [...state.tasks, task];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      }),
    toggleTask: (id: string | number) =>
      set((state: TaskStore) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      }),
    deleteTask: (id: string | number) =>
      set((state: TaskStore) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      }),
    reorderTask: (sourceIndex: number, destinationIndex: number) =>
      set((state) => {
        const newTasks = [...state.tasks];
        const [removed] = newTasks.splice(sourceIndex, 1);
        newTasks.splice(destinationIndex, 0, removed);
        return { tasks: newTasks };
      }),
  })
);

export default useTaskStore;
