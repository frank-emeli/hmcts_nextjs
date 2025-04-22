import { Task } from "../models/task";

export async function createTask(task: Task): Promise<number> {
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

    const result = await res.json();
    return result.id;
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

export async function updateTaskStatus(
  id: number,
  status: string
): Promise<Task> {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update task status");
  }

  const result = await res.json();
  return Task.fromJson(result);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}
