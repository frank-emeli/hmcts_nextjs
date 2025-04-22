"use client";

import { useEffect, useState } from "react";
import {deleteTask, getTasks, updateTaskStatus} from "@/services/task-service";
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

	const handleDelete = async (taskId: number) => {
		try {
			await deleteTask(taskId)
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const handleUpdate = async (taskId: number, status: string) => {
		try {
			await updateTaskStatus(taskId, status);
			const updatedTasks: Task[] = tasks.map((task) => {
				if (task.id === taskId) {
					return new Task(task.id, task.title, task.description, status, task.dueDate);
				}
				return task;
			});
			setTasks(updatedTasks);
		} catch (error) {
			console.error("Error updating task status:", error);
		}
	};

	return (
		<div className="">
			<main className="py-4 px-8">
				<h1 className="text-3xl pt-1 pb-5 font-bold">Task List</h1>
				<ul>
					{tasks.map((task) => (
						<TaskCard
							key={task.id} task={task}
							onTaskClick={handleTaskClick}
							onDelete={handleDelete}
							onUpdate={handleUpdate}
							className="mb-6"
						/>
					))}
				</ul>
			</main>
		</div>
	);
}
