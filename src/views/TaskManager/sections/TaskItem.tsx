import useTaskStore from "@/stores/useTaskStore";
import { motion } from "framer-motion";

const TaskItem = ({ task }: { task: Task }) => {
  const { toggleTask, deleteTask } = useTaskStore();

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      layout
      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition"
    >
      <span
        className={`text-lg w-[60%] ${
          task.completed ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {task.title}
      </span>
      <div>
        {!task.completed && (
          <button
            onClick={() => toggleTask(task.id)}
            className={`mr-2 px-3 py-1 rounded text-white transition transform hover:scale-105 ${
              task.completed
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Complete
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition transform hover:scale-105"
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
