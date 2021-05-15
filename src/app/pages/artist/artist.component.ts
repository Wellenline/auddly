import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ActivatedRoute } from "@angular/router";
import { SwiperOptions } from "swiper";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-artist",
	templateUrl: "./artist.component.html",
	styleUrls: ["./artist.component.scss"],
})
export class ArtistComponent implements OnInit {
	public artist: any = {};
	public albums = [];
	public tracks = [];
	public result = {
		albums: [],
		tracks: [],
		artists: [],
		playlists: [],
	};

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
	public loading = true;
	constructor(private httpService: HttpService, private playerService: PlayerService, private route: ActivatedRoute) { }

	public ngOnInit(): void {

		this.route.params.subscribe((params) => {
			this.getArtist(params.id);
			this.getAlbums(params.id);
			this.getPopular(params.id);
		});

	}

	public getArtist(id: string) {
		this.loading = true;
		this.httpService.get(`/artists/${id}`).subscribe((response: any) => {
			this.artist = response;
			this.getSearchResults(this.artist.name);
			// this.getArtistMetadata();
		}).add(() => {
			this.loading = false;
		});
	}

	public getAlbums(id: string) {
		this.httpService.get(`/albums?artist=${id}`).subscribe((response: any) => {
			this.albums = response.albums;
		});
	}

	public getPopular(id: string) {
		this.httpService.get(`/tracks?popular=true&artist=${id}`).subscribe((response: any) => {
			this.tracks = response.tracks;
		});
	}

	onPlayTracks() {
		if (this.tracks.length > 0) {
			this.playerService.onPlay(...this.tracks);
		}
	}

	public getSearchResults(search) {
		if (search.length < 3) {
			return;
		}

		this.httpService.get(`/search?q=${search}`).subscribe((response: any) => {
			this.result = response;
		});
	}
}
