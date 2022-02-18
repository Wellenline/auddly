import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { NowPlaylingComponent } from "src/app/modules/music/components/now-playling/now-playling.component";
import { ITrack, PlayerService } from "src/app/core/services/player.service";
import { QueueComponent } from "src/app/modules/music/components/queue/queue.component";
import { slideUpDownAnimation } from "src/app/shared/animations/slide-up-down";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
	selector: "app-player",
	templateUrl: "./player.component.html",
	styleUrls: ["./player.component.scss"],
	animations: [slideUpDownAnimation]
})
export class PlayerComponent implements OnInit {
	public progress = 0;
	public volume = (parseFloat(localStorage.getItem("volume")) || 1) * 100;
	public playing = false;
	public currentTime = 0;
	public track: ITrack;
	public isFullscreen = false;
	public volumeControls = false;
	public radialProgress = 0;
	public circumference = 0;
	public hidden = false;


	public lyrics = false;
	public buffering = false;
	public buffer = 0;
	public duration = 0;
	public loading = false;

	public controls = false;
	private destroy = new Subject();

	constructor(public playerService: PlayerService, private modalService: ModalService) { }

	public ngOnInit(): void {
		const r = 19;
		const circumference = Math.PI * (r * 2);
		this.circumference = circumference;

		/*this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});

		this.playerService.$volume.subscribe((volume) => {
			this.volume = volume * 100;
		});

		this.playerService.$progress.subscribe((num) => {
			this.progress = num;


			this.radialProgress = (((100 - this.progress) / 100) * this.circumference);



			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});*/

		this.playerService.$playing.pipe(takeUntil(this.destroy)).subscribe((playing) => {
			this.playing = playing;
		});

		this.playerService.$buffering.pipe(takeUntil(this.destroy)).subscribe((buffering) => {
			this.buffering = buffering;
		});


		this.playerService.$buffer.pipe(takeUntil(this.destroy)).subscribe((buffer) => {
			this.buffer = buffer;
		});


		this.playerService.$volume.pipe(takeUntil(this.destroy)).subscribe((volume) => {
			this.volume = volume * 100;
		});
		this.playerService.$progress.pipe(takeUntil(this.destroy)).subscribe((num) => {
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});


		this.playerService.$track.pipe(takeUntil(this.destroy)).subscribe((track) => {
			this.track = track;
			if (this.track.progress) {
				this.progress = this.track.progress;
			}
			this.lyrics = false;
		});
	}


	public onPlaying() {
		this.hidden = true;
		this.modalService.show({
			component: QueueComponent,
			// class: "fullscreen",
			class: "right",
			position: "right",
			callback: () => {
				this.hidden = false;
			}
		});
	}
	public onLike(e) {
		e.stopPropagation();
		this.playerService.onLike(this.track._id).subscribe(() => {
			this.track.liked = !this.track.liked;
			/*this.interfaceService.notify(`${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});*/
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

	public onSwipe(e) {
		console.log("Swipe", e);
		const direction = Math.abs(e.deltaX) > 40 ? (e.deltaX > 0 ? 1 : 2) : 0;

		if (direction === 2) { // right swipe
			this.playerService.onNext();
		}

		if (direction === 1) { // right swipe
			this.playerService.onPrev();
		}

	}

	ngOnDestroy() {
		this.destroy.next();
	}

}
