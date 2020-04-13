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
	public playing = false;
	public currentTime = 0;
	public track: ITrack;
	public isFullscreen = false;
	constructor(public playerService: PlayerService, private httpService: HttpService) { }

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

	public onProgress(e) {
		this.playerService.onSeek((e.pageX - e.srcElement.offsetLeft) / e.currentTarget.clientWidth);
	}

	public onLike() {
		this.httpService.get(`/tracks/like/${this.track._id}`).subscribe((response) => {
			this.track.favourited = !this.track.favourited;
		});

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
