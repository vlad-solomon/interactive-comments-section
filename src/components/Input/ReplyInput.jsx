import "./Input.scss";
import User from "../../img/avatars/juliusomo.png";
import Button from "../Button/Button";
import { useAutoFocus, uid } from "../../helpers";
import { useContext } from "react";
import CommentsContext from "../../context/CommentsContext";

function ReplyInput() {
	const { selectedComment, setComments, setIsReplying } = useContext(CommentsContext);
	const textRef = useAutoFocus();

	const isReply = selectedComment.replyTo ? true : false;
	const newComment = () => {
		return {
			id: uid(),
			parentId: isReply ? selectedComment.parentId : selectedComment.id,
			replyTo: selectedComment.user,
			isUser: true,
			user: "juliusomo",
			text: textRef.current.value,
			posted: "just now",
			votes: 0,
		};
	};

	return (
		<div className="input input--reply">
			<img src={User} alt="user" className="input__user" />
			<textarea className="input__text-area" placeholder={`Reply to @${selectedComment.user}`} ref={textRef}></textarea>
			<div className="input__buttons">
				<Button text="cancel" secondary onClick={() => setIsReplying(false)} />
				<Button
					text="reply"
					onClick={() => {
						if (!textRef.current.value.length) return;
						if (isReply) {
							setComments((prev) => {
								return prev.map((comment) => {
									if (comment.id === selectedComment.parentId) {
										return { ...comment, replies: [...comment.replies, newComment()] };
									}
									return comment;
								});
							});
						} else {
							setComments((prev) => {
								return prev.map((comment) => {
									if (comment.id === selectedComment.id) {
										return {
											...comment,
											replies: [...comment.replies, newComment()],
										};
									}
									return comment;
								});
							});
						}

						setIsReplying(false);
					}}
				/>
			</div>
		</div>
	);
}

export default ReplyInput;
