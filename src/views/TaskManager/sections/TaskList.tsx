import useTaskStore from "@/stores/useTaskStore";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {tasks
          .sort((a, b) => Number(a.completed) - Number(b.completed))
          .map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </AnimatePresence>
    </ul>
  );
};

export default TaskList;
