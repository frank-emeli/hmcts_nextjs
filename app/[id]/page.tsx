import {getTask} from "@/services/task-service";
import {TaskDetailActions} from "@/components/task-detail-actions";
import {Task} from "@/models/task";
import {TaskNotFoundError} from "@/errors/errors";

interface TaskPageProps {
    params: { id: number };
}

export default async function TaskPage(props: TaskPageProps) {
    const taskId = (await props.params).id;

    let task: Task;
    try {
        task = await getTask(taskId);
    } catch (error) {
        let message = "An unexpected error occurred while fetching the task.";
        if (error instanceof TaskNotFoundError) {
            message = "Task not found.";
        }
        return <div className="max-w-2xl mx-auto space-y-4 py-5">
            <h1 className="text-2xl font-bold">Error fetching task</h1>
            <p>{message}</p>
        </div>;
    }

    return (
        <div>
            {task ? (
                <div className="max-w-2xl mx-auto space-y-4 py-5">
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
                    <TaskDetailActions taskJson={task.toJson()} />
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
