import useTaskStore from "@/stores/useTaskStore";
import { useState } from "react";

const AddTaskForm = () => {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask: Task = { id: Date.now(), title, completed: false };
    addTask(newTask);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex shadow-md">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l focus:outline-none"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-r"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
