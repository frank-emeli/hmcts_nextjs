"use client";

import { useState } from "react";
import {useRouter} from "next/navigation";
import {Task} from "@/models/task";
import {createTask} from "@/services/task-service";

export default function CreateTaskPageProps() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "incomplete",
		dueDate: new Date().toISOString().split("T")[0],
	});
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const task = new Task(0, formData.title, formData.description, formData.status, new Date(formData.dueDate));
			let id: number;
			try {
				id = await createTask(task);
				router.push(`/`);
			} catch (error) {
				console.error("Error creating task:", error);
				// todo: handle error
			}
		} catch (err) {
			console.error("Error submitting form:", err);
		}
	};

	const commonInputClassName="w-full border border-2 border-black px-3 py-2 focus:border-3 focus:outline-offset-0 focus:outline-yellow-400 focus:outline-3"

	return (
		<div className="max-w-2xl mx-auto space-y-4 py-5">
			<h1 className="text-3xl font-bold">Create a new task</h1>
			<form onSubmit={handleSubmit} className="p-4 border border-gray-300">
				<div>
					<label className="block mb-1 font-medium">Title</label>
					<input
						name="title"
						type="text"
						value={formData.title}
						onChange={handleChange}
						className={commonInputClassName}
						required
						max="128"
					/>
				</div>

				<div>
					<label className="block mb-1 font-medium">Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className={commonInputClassName}
						rows={3}
						required
						maxLength={512}
					/>
				</div>

				<div>
					<label className="block mb-1 font-medium">Status</label>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className={commonInputClassName}
					>
						<option value="incomplete">Incomplete</option>
						<option value="complete">Complete</option>
						<option value="on_hold">On Hold</option>
					</select>
				</div>

				<div>
					<label className="block mb-1 font-medium">Due Date</label>
					<input
						name="dueDate"
						type="datetime-local"
						value={formData.dueDate}
						onChange={handleChange}
						className={commonInputClassName}
					/>
				</div>

				<button
					type="submit"
					className="
						bg-green-800
						border-black
						border-b-2
						text-white
			            hover:bg-green-900
						focus:outline-yellow-400
			            focus:outline
			            focus:outline-3
			            focus:outline-offset-0
						px-4
						py-2
						mt-6
						mb-3
						w-full"
					onClick={(e) => {
						e.stopPropagation(); // Prevent the click from propagating to the card
						router.push("/create");
					}}
				>
					Submit Task
				</button>
			</form>
		</div>
	);
}
