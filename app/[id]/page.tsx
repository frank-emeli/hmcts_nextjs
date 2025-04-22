import {deleteTask, getTask, updateTaskStatus} from "@/services/task-service";

interface TaskPageProps {
    params: { id: number };
}

export default async function TaskPage({ params }: TaskPageProps) {
    const taskId = await params.id;

    const task = await getTask(taskId);

    const options = [
        { value: "incomplete", label: "Incomplete" },
        { value: "complete", label: "Completed" },
        { value: "on_hold", label: "On hold" },
    ];

    return (
        <div>
            {task ? (
                <div className="max-w-md mx-auto space-y-4 py-5">
                    <div className="pt-4">
                        {/*<select
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
                            onChange={async (e) => {
                                const newStatus = e.target.value;
                                try {
                                    await updateTaskStatus(taskId, newStatus);
                                } catch (error) {
                                    console.error("Error updating task status:", error);
                                }
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent the click from propagating to the card
                        >
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>*/}
                        {/*<button
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
                            onClick={async (e) => {
                                e.stopPropagation(); // Prevent the click from propagating to the card
                                try {
                                    await deleteTask(task.id);
                                } catch (error) {
                                    console.error("Error deleting task:", error);
                                }
                            }}
                        >
                            Delete
                        </button>*/}
                    </div>
                    <h1 className="text-2xl font-bold">Task Details</h1>
                    <DetailTile
                        title="Title"
                        value={
                            <p>{task.title}</p>
                        }
                    />
                    <DetailTile
                        title="Description"
                        value={
                            <p>{task.description}</p>
                        }
                    />
                    <DetailTile
                        title="Due Date"
                        value={
                            <p>{task.dueDate.toLocaleDateString()}</p>
                        }
                    />
                </div>
            ) : (<div> loading...</div>)}
        </div>
    );
}

interface TaskDetailTileProps {
    title: string;
    value: React.ReactNode;
}

const DetailTile = function({title, value}: TaskDetailTileProps) {
    return (
        <div>
            <div className="font-bold">{title}</div>
            <div>{value}</div>
        </div>
    );
}
