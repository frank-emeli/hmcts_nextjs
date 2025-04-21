"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/services/task-service";
import { Task } from "@/models/task";
import TaskCard from "@/components/task-card";
import { useRouter } from "next/navigation";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
        try {
            const tasks = await getTasks();
            setTasks(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            // todo:: handle error
        }
    })()
  }, []);

  const handleTaskClick = (task: Task) => {
    router.push(`/${task.id}`);
  };

  return (
    <div className="">
      <main className="">
        <h1 className="text-3xl font-bold underline">Task List</h1>
        <ul>
          {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskClick={handleTaskClick} />
          ))}
        </ul>
      </main>
    </div>
  );
}
