import { useRef, useEffect } from "react";

export const useAutoFocus = () => {
	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, []);

	return ref;
};

export const uid = () => {
	return Math.round(Date.now()).toString(36);
};
