import sampleComments from "../sampleComments.json";
import { useState, createContext } from "react";

const CommentsContext = createContext();

export function CommentProvider({ children }) {
	const [comments, setComments] = useState(sampleComments);
	const [isOverlay, setIsOverlay] = useState(false);
	const [selectedComment, setSelectedComment] = useState({});
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const value = {
		comments,
		setComments,
		isOverlay,
		setIsOverlay,
		selectedComment,
		setSelectedComment,
		isReplying,
		setIsReplying,
		isEditing,
		setIsEditing,
	};

	return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
}

export default CommentsContext;
