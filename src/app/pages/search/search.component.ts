import { Component, OnInit } from "@angular/core";
import { debounce } from "src/app/utils";
import { HttpService } from "src/app/services/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PlayerService } from "src/app/services/player.service";
import { SwiperOptions } from "swiper";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
	public result = {
		albums: [],
		tracks: [],
		artists: [],
		playlists: [],
	};

	public search: string;
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
	constructor(private httpService: HttpService, private playerService: PlayerService, private router: Router, private route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			if (params.q) {
				this.search = params.q;
				this.getSearchResults(params.q);
			} else {
				this.fetchAlbums();
				this.fetchArtists();
				this.fetchTracks();
				this.fetchPlaylists();
			}

		});
	}

	public onPlayTracks() {
		if (this.result.tracks.length > 0) {
			this.playerService.onPlay(...this.result.tracks);
		}
	}

	public onSearch(e) {
		const search = e.target.value && e.target.value.length >= 3 ? e.target.value : "";
		this.router.navigate(["."], { relativeTo: this.route, queryParams: { q: search } });
	}

	@debounce(300)
	public getSearchResults(search) {
		if (search.length < 3) {
			return;
		}

		this.httpService.get(`/search?q=${search}`).subscribe((response: any) => {
			this.result = response;
		});
	}

	public fetchArtists() {
		this.httpService.get(`/artists/random?total=20`).subscribe((response: any) => {
			this.result.artists = response;
		});
	}

	public fetchAlbums() {
		this.httpService.get(`/albums/random?total=20`).subscribe((response: any) => {
			this.result.albums = response;
		});
	}

	public fetchTracks() {
		this.httpService.get(`/tracks/random?total=20`).subscribe((response: any) => {
			this.result.tracks = response;
		});
	}

	public fetchPlaylists() {
		this.httpService.get(`/playlists`).subscribe((response: any) => {
			this.result.playlists = [{ name: "Favorites", id: "FAVOURITES" }].concat(response.playlists);
		});
	}
}
