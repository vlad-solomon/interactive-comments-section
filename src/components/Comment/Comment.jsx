import { useEffect, useContext, useState } from "react";
import { useAutoFocus } from "../../helpers";
import "./Comment.scss";

import Plus from "./Plus.svg";
import Minus from "./Minus.svg";
import Placeholder from "./Placeholder.svg";
import Option from "../Option/Option";
import ReplyInput from "../Input/ReplyInput";
import Button from "../Button/Button";

import CommentsContext from "../../context/CommentsContext";

function Comment({ id, replyTo, user, text, posted, votes: initialVotes, isUser }) {
	const { comments, setComments, setSelectedComment, selectedComment, setIsOverlay, isReplying, setIsReplying, isEditing, setIsEditing } = useContext(CommentsContext);

	const [votes, setVotes] = useState(initialVotes);
	const [isHovered, setIsHovered] = useState(false);
	const [voteStyle, setVoteStyle] = useState("");
	const isReply = replyTo ? true : false;
	const textRef = useAutoFocus();

	function getPfp(user) {
		return new URL(`../../img/avatars/${user}.png`, import.meta.url).href;
	}

	function vote(type) {
		if (isUser) return;
		switch (type) {
			case "up":
				return setVotes((prev) => {
					if (votes > initialVotes) return votes;
					return prev + 1;
				});
			case "down":
				return setVotes((prev) => {
					if (votes < initialVotes) return votes;
					return prev - 1;
				});
		}
	}

	useEffect(() => {
		if (votes > initialVotes) {
			setVoteStyle("up");
		} else if (votes < initialVotes) {
			setVoteStyle("down");
		} else {
			setVoteStyle("");
		}
	}, [votes]);

	function findById(id, comments, index = 0) {
		const item = comments[index];
		if (!item) return null;
		if (item.id === id) return item;

		const newComments = item.replies && item.replies.length ? [...comments, ...item.replies] : comments;
		return findById(id, newComments, index + 1);
	}

	return (
		<div className={`comment ${isUser ? "comment--user" : ""}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<div className="comment__container">
				<div className="comment__header">
					<img
						src={getPfp(user)}
						alt={user}
						className="comment__pfp"
						onError={(e) => {
							e.target.src = Placeholder;
						}}
					/>
					<span className="comment__user">
						{user}
						{isUser && <span className="comment__is-user">you</span>}
					</span>
					<span>{posted}</span>
				</div>
				<div className="comment__text">
					{isEditing && id === selectedComment.id ? (
						<div className="comment__edit">
							<textarea defaultValue={text} autoFocus ref={textRef} placeholder={`Editing comment...`}></textarea>
							<Button
								text="update"
								onClick={() => {
									if (!textRef.current.value.length) return;
									if (isReply) {
										setComments((prev) => {
											return prev.map((comment) => {
												if (comment.id === selectedComment.parentId) {
													return {
														...comment,
														replies: [
															...comment.replies.map((reply) => {
																if (reply.id === selectedComment.id) {
																	return {
																		...reply,
																		text: textRef.current.value,
																	};
																}
																return reply;
															}),
														],
													};
												}
												return comment;
											});
										});
									} else {
										setComments((prev) => {
											return prev.map((comment) => {
												if (comment.id === selectedComment.id) {
													return { ...comment, text: textRef.current.value };
												}
												return comment;
											});
										});
									}
									setIsEditing(false);
								}}
							/>
						</div>
					) : (
						<>
							{isReply && <span className="comment__reply-to">{replyTo}</span>}
							{text}
						</>
					)}
				</div>
				<div className="comment__footer">
					<div className={`comment__votes ${voteStyle}`}>
						<div
							className="comment__button comment__button--up"
							onClick={() => {
								vote("up");
							}}
						>
							<img src={Plus} alt="plus" />
						</div>
						<span>{votes}</span>
						<div className="comment__button comment__button--down" onClick={() => vote("down")}>
							<img src={Minus} alt="minus" />
						</div>
					</div>
				</div>
				{isHovered && (
					<div className="comment__options">
						{isUser ? (
							<>
								<Option
									type="Delete"
									onClick={() => {
										setIsReplying(false);
										setIsOverlay(true);
										setSelectedComment(findById(id, comments));
									}}
									danger
								/>
								<Option
									type="Edit"
									onClick={() => {
										setIsReplying(false);
										setSelectedComment(findById(id, comments));
										setIsEditing(true);
									}}
								/>
							</>
						) : (
							<Option
								type="Reply"
								onClick={() => {
									setIsEditing(false);
									setSelectedComment(findById(id, comments));
									setIsReplying(true);
								}}
							/>
						)}
					</div>
				)}
			</div>
			{isReplying && id === selectedComment.id && <ReplyInput />}
		</div>
	);
}

export default Comment;
