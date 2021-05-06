import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PlayerService, ITrack } from "src/app/services/player.service";
import { HttpService } from "src/app/services/http.service";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";

@Component({
	selector: "app-player",
	templateUrl: "./player.component.html",
	styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
	public progress = 0;
	public volume = (parseFloat(localStorage.getItem("volume")) || 1) * 100;
	public playing = false;
	public currentTime = 0;
	public track: ITrack;
	public isFullscreen = false;
	public volumeControls = false;
	constructor(public playerService: PlayerService, private interfaceService: InterfaceService) { }

	public ngOnInit(): void {

		this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});

		this.playerService.$progress.subscribe((num) => {
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});
	}


	public onLike(e) {
		e.stopPropagation();
		this.playerService.onLike(this.track.id).subscribe(() => {
			this.track.liked = !this.track.liked;
			this.interfaceService.notify(`${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});
		});
	}

	public onProgress(e) {
		this.playerService.onSeek(e);
	}

	public onVolume(e) {
		const volume = 1 - e;

		if (volume >= 0 && volume <= 1) {
			this.playerService.onVolume(volume);
		}

		this.volume = volume * 100;
	}

	public onFullscreen(event) {
		this.isFullscreen = true;
		// document.body.requestFullscreen();
	}
	public onCloseFullscreen() {
		// document.exitFullscreen();
		this.isFullscreen = false;
	}
}
