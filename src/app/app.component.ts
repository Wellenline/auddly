import { Component, HostListener } from "@angular/core";
import { ThemeService } from "./core/services/theme.service";
import { UpdateService } from "./core/services/update.service";
import { PlayerService } from "./services/player.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	constructor(private themeService: ThemeService, private updateService: UpdateService) { }
	ngOnInit() {


	}

	ngAfterViewInit() {
		const appHeight = () => {
			const doc = document.documentElement;
			doc.style.setProperty("--app-height", `${window.innerHeight}px`);
		};
		appHeight();
		window.addEventListener("resize", appHeight);
		window.addEventListener("orientationchange", appHeight);
	}
}
