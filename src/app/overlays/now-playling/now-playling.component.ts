import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ITrack, PlayerService } from "src/app/core/services/player.service";
import { SlideRight } from "src/app/shared/animations/slide";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { SidebarService } from "src/app/standalone/sidebar/sidebar.service";
import { ArtistComponent } from "../artist/artist.component";
import { ToastService } from "src/app/standalone/toast/toast.service";

@Component({
	selector: "app-now-playling",
	templateUrl: "./now-playling.component.html",
	styleUrls: ["./now-playling.component.scss"],
	animations: [SlideRight]

})
export class NowPlaylingComponent implements OnInit {
	@Input() public mini = false;
	public tracks: ITrack[] = [];
	public track: ITrack = {};
	public progress = 0;
	public volume = (parseFloat(localStorage.getItem("volume")) || 1) * 100;
	public playing = false;
	public lyrics = false;
	public currentTime = 0;
	public buffering = false;

	public buffer = 0;
	public duration = 0;
	public loading = false;
	public options = {
		maxHeight: "80vh"
	};

	@ViewChild("scroller") virtualScroll: CdkVirtualScrollViewport;

	private destroy = new Subject();
	constructor(public playerService: PlayerService,
		private router: Router,
		private sidebarService: SidebarService,
		private modalService: ModalService,
		private toast: ToastService,
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
			if (this.playerService.audio) {
				this.currentTime = this.playerService.audio.currentTime;
			}
		});

		this.playerService.$queue.pipe(takeUntil(this.destroy)).subscribe((tracks) => {
			this.tracks = tracks;

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

		});

	}

	public onArtist() {
		if (this.track.artist) {
			this.sidebarService.show({
				component: ArtistComponent,
				params: {
					id: this.track.artists[0]._id
				}
			})
		}
	}

	public onSlideChange(e) {
		if (e.activeIndex !== this.playerService.index) {
			this.playerService.onPlay(this.tracks[e.activeIndex]);
		}
	}

	public onProgress(e) {
		this.playerService.onSeek(e);
	}



	public onVolume(e: number) {
		const value = 100 - (e * 100);
		const volume = 1 - (value / 100);
		if (volume >= 0 && volume <= 1) {
			this.playerService.onVolume(volume);
		}
		this.volume = 100 - value;
	}


	public onLike() {
		this.playerService.onLike(this.track._id).subscribe(() => {
			this.track.liked = !this.track.liked;
			this.toast.show({
				message: `${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`
			});
		});
	}

	public onSwipe(e) {
		const direction = Math.abs(e.deltaX) > 40 ? (e.deltaX > 0 ? 1 : 2) : 0;

		if (direction === 2) {
			this.playerService.onNext();
		}

		if (direction === 1) {
			this.playerService.onPrev();
		}

	}


	ngAfterViewInit() {
	}

	ngOnDestroy() {
		this.destroy.next(true);
	}


}
