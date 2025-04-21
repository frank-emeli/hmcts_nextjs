import { Task } from "@/models/task";
// import {useEffect, useState} from "react";
import {getTask, getTasks} from "@/services/task-service";

interface TaskPageProps {
    params: { id: number };
}

export default async function TaskPage({ params }: TaskPageProps) {
    const taskId = await params.id;
    console.log(taskId);

    const task = await getTask(taskId);

    return (
        <div>
            {task ? (
                <div>
                    <h1 className="text-2xl font-bold">Task Details</h1>
                    <p><strong>ID:</strong> {task.id}</p>
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                </div>
            ) : (<div> loading...</div>)}
        </div>
    );
}
