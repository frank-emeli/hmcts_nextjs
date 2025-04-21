import { Task } from "../models/task";

export async function createTask(task: Task): Promise<Task> {
  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task.toJson()),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
}

export async function getTask(id: number): Promise<Task> {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    if (!res.ok) {
        throw new Error("Failed to fetch task");
    }
    const result = await res.json();
    return Task.fromJson(result);
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result = await res.json();

  return Task.fromJsonArray(result);
}
