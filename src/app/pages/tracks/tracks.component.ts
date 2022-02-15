import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { debounceTime, map, startWith } from "rxjs/operators";
import { HttpService } from "src/app/services/http.service";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-tracks",
	templateUrl: "./tracks.component.html",
	styleUrls: ["./tracks.component.scss"],
})
export class TracksComponent implements OnInit {
	public tracks = [];
	public pagination = {
		total: 0,
		skip: 0,
		limit: 50,
	};


	public genres = [];
	public playlists = [];

	public loading = true;
	public genre: { name?: string, _id?: number } = {};
	public playlist: { name?: string, _id?: number } = {};
	hostHeight$: Observable<number>;
	public options = {
		maxHeight: "80vh"
	};
	public filter: { limit?: number, liked?: boolean, playlist?: number, genre?: number, sort?: string } = { sort: "-created_at", limit: 50, };
	constructor(private httpService: HttpService,
		private host: ElementRef,
		private playerService: PlayerService, private route: ActivatedRoute, private router: Router) { }

	public ngOnInit(): void {
		this.hostHeight$ = fromEvent(window, "resize").pipe(
			startWith(this.host.nativeElement.offsetHeight),
			debounceTime(300),
			map(() => (document.getElementsByClassName("app-content").item(0) as any).offsetHeight),
		);
		this.route.queryParams.subscribe((params) => {
			if (this.filter !== params) {
				this.filter = { ...params };
				this.fetchTracks(true);
			}
		});
		this.getGenres();
		this.getPlaylists();

	}


	public onPlay() {
		if (this.tracks.length > 0) {
			this.playerService.onPlay(...this.tracks);
		}
	}


	public onSort(key) {
		console.log(this.filter, key)
		this.filter.sort = this.filter.sort?.includes(key) ?
			(this.filter.sort.startsWith("-") ? this.filter.sort.replace("-", "") : `-${key}`) : key;

		this.router.navigate(["/tracks"], {
			relativeTo: this.route,
			queryParams: {
				sort: this.filter.sort,
			}, queryParamsHandling: "merge",
		});
	}

	public onLiked() {
		this.router.navigate(["/tracks"], {
			relativeTo: this.route,
			queryParams: {
				liked: this.filter.liked ? null : true,
			}, queryParamsHandling: "merge",
		});
		// this.fetchTracks(true);

	}

	public onLimit() {
		const options = [50, 100, 150, 200, 250, 300, 500, 1000];
		/*this.interfaceService.dialog.show({
			items: options,
			type: "picker",
			title: "Limit",
			message: "Choose how many tracks would you like to load with a single request",
			closed: (index) => {
				if (index !== false) {
					this.router.navigate(["/tracks"], {
						relativeTo: this.route,
						queryParams: {
							limit: options[index],
						}, queryParamsHandling: "merge",
					});

				} else {
					this.router.navigate(["/tracks"], {
						relativeTo: this.route,
						queryParams: {
							limit: null,
						}, queryParamsHandling: "merge",
					});

				}
			},
		});*/
	}

	public onPlaylist() {
		/*this.interfaceService.dialog.show({
			items: this.playlists.map((playlist) => playlist.name),
			type: "picker",
			title: "Playlist",
			message: "Choose a playlist to filter",
			closed: (index) => {
				if (index !== false) {
					const { _id, name } = this.playlists[index];
					this.playlist = {
						_id,
						name
					};
					this.router.navigate(["/tracks"], {
						relativeTo: this.route,
						queryParams: {
							playlist: _id,
						}, queryParamsHandling: "merge",
					});

				}
			},
		});*/
	}

	public onGenre() {
		/*this.interfaceService.dialog.show({
			items: this.genres.map((genre) => genre.name),
			type: "picker",
			title: "Genre",
			message: "Choose a genre to filter",
			closed: (index) => {
				if (index !== false) {
					const { _id, name } = this.genres[index];
					this.genre = {
						_id,
						name
					};
					this.router.navigate(["/tracks"], {
						relativeTo: this.route,
						queryParams: {
							genre: _id,
						}, queryParamsHandling: "merge",
					});

				}
			},
		});*/
	}

	public onClearGenre() {
		this.router.navigate(["/tracks"], {
			relativeTo: this.route,
			queryParams: {
				genre: null,
			}, queryParamsHandling: "merge",
		});
	}

	public onClearPlaylist() {
		this.router.navigate(["/tracks"], {
			relativeTo: this.route,
			queryParams: {
				playlist: null,
			}, queryParamsHandling: "merge",
		});

	}


	public getGenres() {
		this.httpService.get(`/genres`).subscribe((response: any[]) => {
			this.genres = response;

			if (this.filter.genre) {
				this.genre = this.genres.find((genre) => genre._id === this.filter.genre);
			}
		});
	}

	public getPlaylists() {
		this.httpService.get(`/playlists`).subscribe((response: { playlists: [] }) => {
			this.playlists = response.playlists;
			console.log(this.playlists);
			if (this.filter.playlist) {
				this.playlist = this.playlists.find((playlist) => playlist._id === this.filter.playlist);
			}
		});
	}

	public onScroll(e) {
		if (this.tracks.length > 0 && e.endIndex === this.tracks.length - 1) {
			if (this.tracks.length !== this.pagination.total) {
				this.pagination.skip += this.pagination.limit;
				this.fetchTracks();
			}
		}
	}

	private fetchTracks(reset: boolean = false) {
		this.loading = true;

		if (reset) {
			this.tracks = [];
			this.pagination.total = 0;
			this.pagination.skip = 0;
			this.pagination.limit = this.filter.limit ? Number(this.filter.limit) : 50;

		}

		const query = Object.keys(this.filter).filter((k) => k !== "limit").map(k => `${encodeURIComponent(k)}=${encodeURIComponent(this.filter[k])}`).join("&");

		this.httpService.get(`/tracks?skip=${this.pagination.skip}&limit=${this.pagination.limit}&${query}`).subscribe((response: any) => {
			this.tracks = this.tracks.concat(response.tracks);
			this.pagination.total = response.total;
			this.loading = false;
		}, (err) => {
			console.log(err);
		});
	}

	trackBy(index: number, el: any): number {
		return el._id;
	}
}
