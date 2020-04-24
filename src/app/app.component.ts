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
	@HostListener("document:keypress", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		console.log(event.keyCode, event.ctrlKey, event.key);
		// this.key = event.key;

		/*switch (event.keyCode) {
			case 32:
				this.playerService.onPlayback();
				break;
			case 100:
				this.playerService.onNext();
				break;
			case 97:
				this.playerService.onPrev();
				break;
			default:
				break;
		}*/
	}
}
