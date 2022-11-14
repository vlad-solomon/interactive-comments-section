import "./Input.scss";
import Button from "../Button/Button";
import { useContext, useRef, useEffect } from "react";
import CommentsContext from "../../context/CommentsContext";

import User from "../../img/avatars/juliusomo.png";
import { uid } from "../../helpers";

function Input() {
	const { comments, setComments, setIsEditing, setIsReplying } = useContext(CommentsContext);

	const textRef = useRef();

	useEffect(() => {
		textRef.current.value = "";
	}, [comments]);

	return (
		<div className="input">
			<img src={User} alt="user" className="input__user" />
			<textarea
				className="input__text-area"
				placeholder="Add a comment..."
				ref={textRef}
				onFocus={() => {
					setIsEditing(false);
					setIsReplying(false);
				}}
			></textarea>
			<Button
				text="send"
				onClick={() => {
					if (!textRef.current.value.length) return;
					setComments((prev) => [...prev, { id: uid(), isUser: true, user: "juliusomo", text: textRef.current.value, posted: "Just now", votes: 0 }]);
				}}
			/>
		</div>
	);
}

export default Input;
