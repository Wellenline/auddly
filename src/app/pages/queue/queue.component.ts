import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { Location } from "@angular/common";
import { SwiperComponent } from "swiper/angular";
import { debounce } from "src/app/utils";
import { SwiperOptions } from "swiper";

@Component({
	selector: "app-queue",
	templateUrl: "./queue.component.html",
	styleUrls: ["./queue.component.scss"],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueComponent implements OnInit {
	public tracks = [];
	public track: ITrack = {};
	public progress = 0;
	public volume = (parseFloat(localStorage.getItem("volume")) || 1) * 100;
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
	};
	public lyrics = false;
	public actions = [];

	public currentTime = 0;
	public buffering = false;
	public buffer = 0;
	@ViewChild("swiper") swiper: SwiperComponent;
	constructor(public playerService: PlayerService, private location: Location) { }

	ngOnInit(): void {
		this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});

		this.playerService.$buffering.subscribe((buffering) => {
			this.buffering = buffering;
		});


		this.playerService.$buffer.subscribe((buffer) => {
			this.buffer = buffer;
		});


		this.playerService.$volume.subscribe((volume) => {
			this.volume = volume * 100;
		});
		this.playerService.$progress.subscribe((num) => {
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$queue.subscribe((tracks) => {
			this.tracks = tracks;
			if (!this.config.initialSlide) {
				this.config.initialSlide = this.playerService.index;

			}
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
			if (this.track.progress) {
				this.progress = this.track.progress;
			}
			this.lyrics = false;
			if (this.swiper) {
				this.swiper.setIndex(this.playerService.index);
			}

			this.actions = [{
				title: "Add to playlist",
				action: this.onPlaylist.bind(this),
			}, {
				title: "More from artist",
				route: "/library/artists/" + this.track.album.artist._id,
			}, {
				title: "Go to album",
				route: "/library/albums/" + this.track.album._id,
			}, {
				title: "Clear queue",
				action: this.onClear.bind(this)
			}];
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
	}

	public onPlaylist() {
		this.playerService.onAddToPlaylist(this.track);
	}

	public onVolume(e) {
		const volume = 1 - e;

		if (volume >= 0 && volume <= 1) {
			this.playerService.onVolume(volume);
		}

		this.volume = volume * 100;
	}


	onLike(e) {
		e.stopPropagation();
		this.playerService.onLike(this.track._id).subscribe(() => {
			this.track.liked = !this.track.liked;
			/*this.interfaceService.notify(`${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});*/
		});
	}

}
