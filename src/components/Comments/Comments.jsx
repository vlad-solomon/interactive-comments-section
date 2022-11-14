import { Fragment, useContext } from "react";
import CommentsContext from "../../context/CommentsContext";
import "./Comments.scss";
import Comment from "../Comment/Comment";
import Input from "../Input/Input";

function Comments() {
	const { comments } = useContext(CommentsContext);
	return (
		<div className="comments">
			{comments.map((comment) => {
				return (
					<Fragment key={comment.id}>
						<Comment key={comment.id} {...comment} />
						{Object.hasOwn(comment, "replies") && Object.values(comment.replies).length ? (
							<div className="comment__replies">
								{comment.replies.map((reply) => {
									return <Comment key={reply.id} {...reply} />;
								})}
							</div>
						) : (
							""
						)}
					</Fragment>
				);
			})}
			<Input />
		</div>
	);
}

export default Comments;
