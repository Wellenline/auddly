import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { Location } from '@angular/common';
import { SwiperComponent } from "swiper/angular";
import { debounce } from "src/app/utils";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";
import { SwiperOptions } from "swiper";

@Component({
	selector: "app-queue",
	templateUrl: "./queue.component.html",
	styleUrls: ["./queue.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueComponent implements OnInit {
	public tracks = [];
	public track: ITrack = {};
	public progress = 0;
	public volume = 100;
	public playing = false;
	public config: SwiperOptions = {
		virtual: true,
		slidesPerView: 1,
		spaceBetween: 20,
		centeredSlides: true,
		effect: "coverflow",
		coverflowEffect: {
			rotate: 0,
			stretch: 80,
			depth: 200,
			modifier: 1,
			slideShadows: false,
		},
		on: {
			slideChange: (swiper) => {
				console.log("Custom event listener");
			}
		}
	}
	public currentTime = 0;
	@ViewChild("swiper") swiper: SwiperComponent;
	constructor(public playerService: PlayerService, private interfaceService: InterfaceService, private location: Location) { }

	ngOnInit(): void {
		this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});
		this.playerService.$progress.subscribe((num) => {
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$queue.subscribe((tracks) => {
			this.tracks = tracks;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
			if (!this.config.initialSlide) {
				this.config.initialSlide = this.playerService.index;

			}
			if (this.swiper && this.playerService.index !== this.swiper.index) {
				console.log("Swiper", this.playerService.index, this.swiper.index);
				this.swiper.setIndex(this.playerService.index);

			}

		});



	}
	onSlideChange(e) {
		console.log("slide changed", e);
		e.stopPropagation();
		this.playerService.onPlay(this.tracks[e.realIndex]);

	}

	public onProgress(e) {
		this.playerService.onSeek(e);
	}


	public onClear() {
		this.playerService.clear();
	}

	public ngAfterViewInit() {
		console.log(this.swiper);
		console.log(this.playerService.index);
		// this.swiper.setIndex(this.playerService.index, 0, true);
		/*if (!this.playing && this.swiper && this.playerService.index !== this.swiper.index) {
			console.log("Swiper", this.playerService.index, this.swiper.index);
			this.swiper.setIndex(this.playerService.index);
		}*/


	}

	public onClose() {
		this.location.back();
	}

	public onPlaylist() {

	}

	onLike(e) {
		e.stopPropagation();
		this.playerService.onLike(this.track.id).subscribe(() => {
			this.track.liked = !this.track.liked;
			this.interfaceService.notify(`${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});
		});
	}

}
