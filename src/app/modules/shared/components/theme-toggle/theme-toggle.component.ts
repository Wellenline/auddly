import { Component, OnInit } from "@angular/core";
import { ThemeService } from "src/app/services/theme.service";

@Component({
	selector: "app-theme-toggle",
	templateUrl: "./theme-toggle.component.html",
	styleUrls: ["./theme-toggle.component.scss"],
})
export class ThemeToggleComponent implements OnInit {

	constructor(public themeService: ThemeService) { }

	public ngOnInit(): void {
	}
	public onToggle() {
		this.themeService.toggle();
	}
}
