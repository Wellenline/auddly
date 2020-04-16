import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PlayerService, ITrack } from "src/app/services/player.service";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-player",
	templateUrl: "./player.component.html",
	styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
	public progress = 0;
	public volume = 100;
	public playing = false;
	public currentTime = 0;
	public track: ITrack;
	public isFullscreen = false;
	constructor(public playerService: PlayerService) { }

	public ngOnInit(): void {

		this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});

		this.playerService.$progress.subscribe((num) => {
			console.log(num);
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});
	}

	public onProgress(e) {
		this.playerService.onSeek((e.pageX - e.srcElement.offsetLeft) / e.currentTarget.clientWidth);
	}

	public onVolume(e) {
		const volume = (e.pageX - e.srcElement.offsetLeft) / e.currentTarget.clientWidth;
		console.log(volume);

		this.volume = volume * 100;
		this.playerService.onVolume(volume);
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
