import { Component, HostListener, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { PlaylistService } from "src/app/services/playlist.service";
import { ThemeService } from "src/app/services/theme.service";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
	public track: ITrack = {};

	constructor(private playerService: PlayerService, private router: Router, public playlistService: PlaylistService, private themeService: ThemeService,) { }
	ngOnInit() {
		const color = localStorage.getItem("accent-color");

		if (color) {
			document.documentElement.style.setProperty("--accent-color", color);
		}

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event: RouterEvent) => {
				if (event && event.url) {
					console.log(event);

				}
			});
	}
	@HostListener("document:keypress", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		//
	}

}
