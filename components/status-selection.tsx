import {Task} from "@/models/task";

interface Props {
	currentTask: Task;
	onUpdate: (taskId: number, status: string) => void;
}

export default function StatusSelection({currentTask, onUpdate}: Props) {
	const options = [
		{ value: "incomplete", label: "Incomplete" },
		{ value: "complete", label: "Completed" },
		{ value: "on_hold", label: "On hold" },
	];

	return (
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
			value={currentTask.status}
			onChange={(e) => {
				const newStatus = e.target.value;
				onUpdate(currentTask.id, newStatus);
			}}
			onClick={(e) => e.stopPropagation()} // Prevent the click from propagating to the card
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}
