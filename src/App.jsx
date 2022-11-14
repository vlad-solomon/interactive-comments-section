import "./App.css";

import Comments from "./components/Comments/Comments";
import Overlay from "./components/Overlay/Overlay";
import Modal from "./components/Modal/Modal";

import { useContext } from "react";
import CommentsContext from "./context/CommentsContext";

import "./media.scss";

function App() {
	const { isOverlay } = useContext(CommentsContext);
	return (
		<>
			{isOverlay && (
				<Overlay>
					<Modal />
				</Overlay>
			)}
			<div className="App">
				<Comments />
			</div>
		</>
	);
}

export default App;
