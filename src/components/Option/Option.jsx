import "./Option.scss";

function Option({ type, onClick, danger }) {
	function getIcon(type) {
		return new URL(`./${type}.svg`, import.meta.url).href;
	}

	return (
		<div className={`option option--${type.toLowerCase()} ${danger ? "danger" : ""}`} onClick={onClick}>
			<img src={getIcon(type)} alt={type} />
			<span>{type}</span>
		</div>
	);
}

export default Option;
