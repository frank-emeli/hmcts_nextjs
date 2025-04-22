import {Task} from "@/models/task";

interface TaskCardProps {
	className?: string;
	task: Task;
	onTaskClick: (task: Task) => void;
	onDelete: (taskId: number) => void;
	onUpdate: (taskId: number, status: string) => void;
}
export default function TaskCard({task, onTaskClick, onUpdate, onDelete, className}: TaskCardProps) {
	const options = [
		{ value: "incomplete", label: "Incomplete" },
		{ value: "complete", label: "Completed" },
		{ value: "on_hold", label: "On hold" },
	];

	return (
		<div
			key={task.id}
			className={`border border-gray-300 p-6 my-2 ${className || ""}`}
			onClick={() => onTaskClick(task)}
		>
			<h2 className="text-xl pb-4">{task.title}</h2>
			<p>{task.description}</p>
			<p className="pt-1 text-gray-500 text-sm">Due Date: {task.dueDate.toLocaleDateString()}</p>
			<div className="pt-4">
				<select
					className="border-3
					 border-black
		             focus:outline-yellow-400
		             hover:outline-yellow-400
		             focus:outline
		             hover:outline
		             focus:outline-3
		             hover:outline-3
		             focus:outline-offset-0
		             hover:outline-offset-0
		             px-3
		             py-2"
					value={task.status}
					onChange={(e) => {
						const newStatus = e.target.value;
						onUpdate(task.id, newStatus);
					}}
					onClick={(e) => e.stopPropagation()} // Prevent the click from propagating to the card
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<button
					className="
						bg-red-600
						border-b-3
						border-black
						text-white
			            hover:bg-red-700
						focus:outline-yellow-400
			            focus:outline
			            focus:outline-3
			            focus:outline-offset-0
						px-4
						py-2
						mt-2
						ml-2"
					onClick={(e) => {
						e.stopPropagation(); // Prevent the click from propagating to the card
						onDelete(task.id);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
