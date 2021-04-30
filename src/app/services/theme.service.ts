import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	public theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
	constructor() {
		if (this.theme) {
			document.documentElement.setAttribute("data-theme", this.theme);
		}
	}

	public toggle() {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		let targetTheme = "light";

		if (currentTheme === "light") {
			targetTheme = "dark";
		}

		document.documentElement.setAttribute("data-theme", targetTheme);
		localStorage.setItem("theme", targetTheme);

		this.theme = targetTheme;
	}
}
