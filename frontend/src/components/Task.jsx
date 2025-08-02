import { useMutation } from "@tanstack/react-query";

import { Check } from "../components/icons/Check";
import { Delete } from "../components/icons/Delete";
import { deleteTask, markDone } from "../lib/api";
import queryClient from "../config/queryClient";
import { Loading } from "../components/icons/Loading";

const Task = ({ task }) => {
  const TASK = "task";

  const { mutate: removeTask, isPending: pendingDel } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.setQueryData([TASK], (oldData) => {
        if (!oldData) return { tasks: [] };
        return {
          ...oldData,
          tasks: oldData.tasks.filter((item) => item.id !== task.id),
        };
      });
    },
  });

  const { mutate: taskDone, isPending: pendingDone } = useMutation({
    mutationFn: markDone,
    onSuccess: (data) => {
      queryClient.setQueryData([TASK], (oldData) => {
        return {
          ...oldData,
          tasks: oldData.tasks.map((item) =>
            item.id === data.task.id
              ? { ...item, isDone: data.task.isDone }
              : item,
          ),
        };
      });
    },
  });

  const toggleDone = () => {
    taskDone(task.id);
  };

  return (
    <div className={`${task.isDone ? "bg-gray-500" : "bg-blue-500"} rounded text-center text-white flex p-2 items-center justify-between`}>
      <div>
        <h3
          className={`font-bold text-xl capitalize ${task.isDone ? "line-through" : ""}`}
        >
          {task.title}
        </h3>
      </div>
      <div className="flex flex-col justify-between">
        <button
          className="bg-green-500 p-1 cursor-pointer hover:bg-green-400"
          onClick={toggleDone}
        >
          {pendingDone ? <Loading /> : <Check />}
        </button>
        <button
          className="bg-red-500 p-1 cursor-pointer hover:bg-red-400"
          onClick={() => removeTask(task.id)}
        >
          {pendingDel ? <Loading /> : <Delete />}
        </button>
      </div>
    </div>
  );
};

export default Task;
