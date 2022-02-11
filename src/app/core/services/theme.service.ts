import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Injectable({
	providedIn: "root"
})
export class ThemeService {
	public theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

	constructor(private meta: Meta) {
		if (this.theme) {
			document.documentElement.setAttribute("data-theme", this.theme);
			this.meta.updateTag({ name: 'theme-color', content: this.theme === "dark" ? "#000000" : "#ffffff" });

		}
	}

	public onDark() {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		let targetTheme = "light";

		if (currentTheme === "light") {
			targetTheme = "dark";
		}

		document.documentElement.setAttribute("data-theme", targetTheme);
		localStorage.setItem("theme", targetTheme);

		this.theme = targetTheme;
		this.meta.updateTag({ name: 'theme-color', content: targetTheme === "dark" ? "#000000" : "#ffffff" });

		if ((window as any).nsWebViewBridge) {
			(window as any).nsWebViewBridge.emit("theme", { color: this.theme === "dark" ? "#1a1a1a" : "#ffffff" });
		}
	}
}
