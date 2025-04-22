"use client";

import StatusSelection from "@/components/status-selection";
import Button from "@/components/button";
import {deleteTask, updateTaskStatus} from "@/services/task-service";
import {Task} from "@/models/task";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface Props {
	taskJson: {status: string, id: number, title: string, description: string, dueDate: string};
}

export function TaskDetailActions(props: Props) {
	const router = useRouter();
	const [status, setStatus] = useState(props.taskJson.status);

	const handleDelete = async (taskId: number) => {
		try {
			await deleteTask(taskId)
			router.push("/");
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const handleUpdate = async (taskId: number, newStatus: string) => {
		setStatus(newStatus);

		try {
			await updateTaskStatus(taskId, newStatus);
			// todo:: update the task status in the UI
		} catch (error) {
			console.error("Error updating task status:", error);
		}
	};

	const task = Task.fromJson(props.taskJson);
	task.status = status;

	return (
		<div>
			<StatusSelection currentTask={task} onUpdate={handleUpdate}/>
			<Button
				className="
                                    bg-red-600
                                    border-b-3
                                    hover:bg-red-700"
				label="Delete"
				onClick={() => handleDelete(task.id)}
			/>
		</div>
	);
}
