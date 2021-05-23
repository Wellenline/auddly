import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { BottomSheetComponent } from "src/app/modules/shared/components/bottom-sheet/bottom-sheet.component";
import { ModalComponent } from "src/app/modules/shared/components/modal/modal.component";
import { BottomSheetConfig } from "src/app/modules/shared/interfaces/bottom-sheet";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { SwiperOptions } from "swiper";
import { SwiperComponent } from "swiper/angular";
import { NavigationEnd, Router } from "@angular/router";
import { filter, takeUntil, takeWhile } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
	selector: "app-now-playing",
	templateUrl: "./now-playing.component.html",
	styleUrls: ["./now-playing.component.scss"]
})
export class NowPlayingComponent implements OnInit {
	public tracks = [];
	public track: ITrack = {};
	public progress = 0;
	public volume = (parseFloat(localStorage.getItem("volume")) || 1) * 100;
	public playing = false;
	public config: SwiperOptions = {
		virtual: true,
		slidesPerView: 1,
		spaceBetween: 0,


	};
	public lyrics = false;

	public currentTime = 0;
	public buffering = false;
	public buffer = 0;
	public duration = 0;
	public loading = false;
	@ViewChild("swiper") swiper: SwiperComponent;
	@ViewChild("bottomSheet") bottomSheet: BottomSheetComponent;
	public options: BottomSheetConfig = {
		maxHeight: "80vh"
	};
	private SWIPE_ACTION = { LEFT: "swipeleft", RIGHT: "swiperight" };

	private destroy = new Subject();
	constructor(public playerService: PlayerService, private interfaceService: InterfaceService, private location: Location,
		private router: Router,
		// private modal: ModalPageComponent,
	) { }

	ngOnInit(): void {
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

		this.playerService.$queue.pipe(takeUntil(this.destroy)).subscribe((tracks) => {
			this.tracks = tracks;
			if (!this.config.initialSlide) {
				this.config.initialSlide = this.playerService.index;

			}
			this.duration = 0;
			this.tracks.map((track) => {
				if (track.duration) {
					this.duration += track.duration;
				}
			});
		});

		this.playerService.$track.pipe(takeUntil(this.destroy)).subscribe((track) => {
			this.track = track;
			if (this.track.progress) {
				this.progress = this.track.progress;
			}
			this.lyrics = false;
			if (this.swiper) {
				this.swiper.setIndex(this.playerService.index);
			}


		});

	}

	public onSlideChange(e) {
		if (e.activeIndex !== this.playerService.index) {
			this.playerService.onPlay(this.tracks[e.activeIndex]);
		}
	}

	public onProgress(e) {
		this.playerService.onSeek(e);
	}


	public onClear() {
		this.playerService.clear();
	}

	public onClose() {
		this.location.back();
		// this.modal.close();
	}

	public onPlaylist() {
		this.playerService.onAddToPlaylist(this.track);
	}

	public onVolume(e: number) {
		const value = 100 - (e * 100);
		const volume = 1 - (value / 100);
		if (volume >= 0 && volume <= 1) {
			this.playerService.onVolume(volume);
		}
		this.volume = 100 - value;
	}


	public onLike(e) {
		this.playerService.onLike(this.track.id).subscribe(() => {
			this.track.liked = !this.track.liked;
			this.interfaceService.notify(`${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});
		});
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
