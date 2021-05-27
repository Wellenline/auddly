import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { PlayerService, ITrack } from "src/app/services/player.service";
import { ActivatedRoute } from "@angular/router";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";
import { SwiperOptions } from "swiper";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit {
	public album: any = {};
	public tracks: ITrack[] = [];
	public duration = 0;
	public loading = true;
	public albums = [];
	public config: SwiperOptions = {
		slidesOffsetBefore: 20,
		slidesOffsetAfter: 20,
		navigation: false,
		pagination: false,
		breakpoints: {
			0: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			// when window width is >= 320px
			320: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			// when window width is >= 640px
			640: {
				slidesPerView: 4,
				spaceBetween: 40
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 40
			},

		},
	};
	constructor(private httpService: HttpService,
		private playerService: PlayerService,
		private route: ActivatedRoute,
		private interfaceService: InterfaceService) { }

	public ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.albums = [];
			this.getTracks(params.id);
			this.getAlbum(params.id);
		});
	}

	public getTracks(id: string) {
		this.httpService.get(`/tracks?album=${id}&skip=0&limit=1500`).subscribe((response: { tracks: ITrack[] }) => {
			this.tracks = response.tracks;

			this.tracks.map((track) => {
				if (track.duration) {
					this.duration += track.duration;
				}
			});
		}, (err) => {
			console.log("Failed to load tracks", err);
		});
	}

	public onPlayAlbum() {
		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(...this.tracks);
		} else {
			this.playerService.queue(this.tracks);
		}

		this.interfaceService.notify(`${this.tracks.length} tracks added to queue`, {
			timeout: 3000,
		});
	}

	public getAlbum(id: string) {
		this.loading = true;
		this.httpService.get(`/albums/${id}`).subscribe((response: any) => {
			this.album = response;

			this.getAlbums(this.album.artist.id);

		}, (err) => {
			console.log("Failed to load album", err);
		}).add(() => {
			this.loading = false;
		});
	}

	public getAlbums(id: string) {
		this.loading = true;
		this.httpService.get(`/albums?artist=${id}`).subscribe((response: any) => {
			this.albums = response.albums.filter((album) => album.id !== this.album.id);
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}

}
