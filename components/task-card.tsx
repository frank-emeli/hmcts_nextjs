import {Task} from "@/models/task";

interface TaskCardProps {
    task: Task;
    onTaskClick: (task: Task) => void;
}
export default function TaskCard({task, onTaskClick}: TaskCardProps) {
  return (
      <div
          key={task.id}
          className="border p-4 my-2"
          onClick={() => onTaskClick(task)}
      >
          <h2 className="text-xl">{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due Date: {task.dueDate.toLocaleDateString()}</p>
          <select
              value={task.status}
              onChange={(e) => {}}
          >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Completed</option>
              <option value="on_hold">On hold</option>
          </select>
          <button className="bg-red-500 text-white px-4 py-2 mt-2 ml-2">
              Delete
          </button>
      </div>
  );
}
