import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { createTask, getTasks } from "../lib/api";
import Task from "../components/Task";
import queryClient from "../config/queryClient";
import { Loading } from "../components/icons/Loading";

const Home = () => {
  const [title, setTitle] = useState("");
  const TASK = "task";

  const { mutate: createNewTask, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData([TASK], (oldData) => {
        oldData.tasks.push(newTask.task);
      });
      setTitle("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask({ title });
  };

  const { data } = useQuery({
    queryKey: [TASK],
    queryFn: getTasks,
  });
  const tasks = data?.tasks;

  return (
    <main>
      <div className="container mx-auto px-2 sm:px-0">
        <h1 className="text-center text-3xl my-5">New task</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 bg-gray-100 p-5 rounded max-w-lg mx-auto">
            <div className="flex flex-col gap-2">
              <label>Task</label>
              <input
                type="text"
                placeholder="Do the dishes..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded py-1 px-2"
              />
            </div>
            <button
              className="bg-blue-500 text-white text-lg py-1 rounded cursor-pointer hover:bg-blue-400 disabled:bg-gray-500 disabled:cursor-default"
              type="submit"
              disabled={title.length < 1}
            >
              {isPending ? <Loading /> : "Add task"}
            </button>
          </div>
        </form>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-5 mt-5 py-5">
          {tasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
