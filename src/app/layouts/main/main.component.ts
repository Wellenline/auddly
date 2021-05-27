import { Component, HostListener, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { ThemeService } from "src/app/services/theme.service";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {

	constructor(private themeService: ThemeService) { }
	ngOnInit() {
		const color = localStorage.getItem("accent-color");
		if (color) {
			document.documentElement.style.setProperty("--accent-color", color);
		}
	}
	@HostListener("document:keypress", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		//
	}

}
