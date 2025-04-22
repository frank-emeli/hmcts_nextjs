interface Props {
	className?: string;
	label: string;
	onClick: () => void;
}

export default function Button({label, className, onClick}: Props) {
	const options = [
		{ value: "incomplete", label: "Incomplete" },
		{ value: "complete", label: "Completed" },
		{ value: "on_hold", label: "On hold" },
	];

	const commonInputClassName = "border-black text-white focus:outline-yellow-400 focus:outline focus:outline-3 focus:outline-offset-0 px-4 py-2 mt-2 ml-2";

	return (
		<button
			className={`${commonInputClassName} ${className || ""}`}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			{label}
		</button>
	);
}
