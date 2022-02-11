import { Component, OnInit } from "@angular/core";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
	selector: "app-theme-toggle",
	templateUrl: "./theme-toggle.component.html",
	styleUrls: ["./theme-toggle.component.scss"]
})
export class ThemeToggleComponent implements OnInit {

	public isDark: boolean;
	constructor(public themeService: ThemeService) {
		this.isDark = this.themeService.theme === "dark";
	}

	ngOnInit(): void {
	}

	public onToggle() {
		this.themeService.onDark();

	}

}
