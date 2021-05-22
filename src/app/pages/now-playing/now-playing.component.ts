import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalPageComponent } from "src/app/modules/shared/components/modal-page/modal-page.component";
import { BottomSheetComponent } from "src/app/modules/shared/components/bottom-sheet/bottom-sheet.component";
import { ModalComponent } from "src/app/modules/shared/components/modal/modal.component";
import { BottomSheetConfig } from "src/app/modules/shared/interfaces/bottom-sheet";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { SwiperOptions } from "swiper";
import { SwiperComponent } from "swiper/angular";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

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
		virtual: false,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,

	};
	public lyrics = false;
	public actions = [];

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

	constructor(public playerService: PlayerService, private interfaceService: InterfaceService, private location: Location,
		private modal: ModalPageComponent,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		).subscribe((event: NavigationEnd) => {
			if (this.modal.visible) {
				this.modal.close();
			}
		});
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
			this.duration = 0;
			this.tracks.map((track) => {
				if (track.duration) {
					this.duration += track.duration;
				}
			});
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
				route: "/library/artists/" + this.track.album.artist.id,
			}, {
				title: "Go to album",
				route: "/library/albums/" + this.track.album.id,
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
		// this.modal.close();
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
		this.playerService.onLike(this.track.id).subscribe(() => {
			this.track.liked = !this.track.liked;
			this.interfaceService.notify(`${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});
		});
	}


}
