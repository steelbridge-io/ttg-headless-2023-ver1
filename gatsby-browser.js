import React from "react";
import { Helmet } from "react-helmet";

export const onClientEntry = async () => {
	if (typeof IntersectionObserver === "undefined") {
		await import("intersection-observer");
		console.log("IntersectionObserver polyfilled ;)");
	}
}