import { Component, HostListener } from "@angular/core";
import { PlayerService } from "./services/player.service";
import { PlaylistService } from "./services/playlist.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	public title = "waveline-web-app";
	constructor(private playerService: PlayerService, public playlistService: PlaylistService) { }
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
