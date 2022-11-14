import "./Modal.scss";
import Button from "../Button/Button";

import { useContext } from "react";
import { useAutoFocus } from "../../helpers";
import CommentsContext from "../../context/CommentsContext";

function Modal() {
	const { setIsOverlay, setComments, selectedComment } = useContext(CommentsContext);
	const isReply = selectedComment.replyTo ? true : false;
	const modalRef = useAutoFocus();

	return (
		<div className="modal" tabIndex={0} ref={modalRef} onBlur={() => setIsOverlay(false)}>
			<span className="modal__title">Delete comment</span>
			<span className="modal__text">Are you sure you want to delete this comment? This will remove the comment and can't be undone</span>
			<div className="modal__buttons">
				<Button
					text="no, cancel"
					onClick={() => {
						setIsOverlay(false);
					}}
				/>
				<Button
					text="yes, delete"
					danger
					onClick={() => {
						if (isReply) {
							setComments((prev) => {
								return prev.map((comment) => {
									if (comment.id === selectedComment.parentId) {
										return { ...comment, replies: comment.replies.filter((reply) => reply.id !== selectedComment.id) };
									}
									return comment;
								});
							});
						} else {
							setComments((prev) => prev.filter((comment) => comment.id !== selectedComment.id));
						}
						setIsOverlay(false);
					}}
				/>
			</div>
		</div>
	);
}

export default Modal;
