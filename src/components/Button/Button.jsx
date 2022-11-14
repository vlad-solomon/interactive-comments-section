import "./Button.scss";

function Button({ text, onClick, secondary, danger }) {
	return (
		<div className={`button ${secondary ? "button--secondary" : ""}${danger ? "danger" : ""}`} onClick={onClick}>
			{text}
		</div>
	);
}

export default Button;
