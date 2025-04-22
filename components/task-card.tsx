import {Task} from "@/models/task";
import StatusSelection from "@/components/status-selection";
import Button from "@/components/button";

interface TaskCardProps {
	className?: string;
	task: Task;
	onTaskClick: (task: Task) => void;
	onDelete: (taskId: number) => void;
	onUpdate: (taskId: number, status: string) => void;
}
export default function TaskCard({task, onTaskClick, onUpdate, onDelete, className}: TaskCardProps) {
	return (
		<div
			key={task.id}
			className={`border border-gray-300 p-6 my-2 cursor-pointer task-card ${className || ""}`}
			onClick={() => onTaskClick(task)}
		>
			<h2 className="text-xl pb-4">{task.title}</h2>
			<p>{task.description}</p>
			<p className="pt-1 text-gray-500 text-sm">Due Date: {task.dueDate.toLocaleDateString()}</p>
			<div className="pt-4">
				<StatusSelection currentTask={task} onUpdate={onUpdate} />
				<Button
					className="
						bg-red-600
						border-b-3
			            hover:bg-red-700"
					label="Delete"
					onClick={() => onDelete(task.id)}
				/>
			</div>
		</div>
	);
}
