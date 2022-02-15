import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { startWith, debounceTime, map } from 'rxjs/operators';
import { MusicService } from 'src/app/core/services/music.service';
import { HttpService } from 'src/app/services/http.service';
import { PlayerService } from 'src/app/services/player.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { PlaylistComponent } from '../../components/playlist/playlist.component';

@Component({
	selector: 'app-tracks',
	templateUrl: './tracks.component.html',
	styleUrls: ['./tracks.component.scss']
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
	public filter: { limit?: string, liked?: boolean, playlist?: string, genre?: string, sort?: string } = { sort: "-created_at", limit: "50", playlist: "", genre: "" };
	public limits = [10, 20, 30, 50, 100, 150, 200, 250, 300, 500, 1000];

	constructor(private httpService: HttpService,
		private host: ElementRef,
		private playerService: PlayerService,
		private musicService: MusicService, private modalService: ModalService, private route: ActivatedRoute, private router: Router) { }

	public ngOnInit(): void {
		this.hostHeight$ = fromEvent(window, "resize").pipe(
			startWith(this.host.nativeElement.offsetHeight),
			debounceTime(300),
			map(() => (document.getElementsByClassName("app-content").item(0) as any).offsetHeight),
		);
		this.route.queryParams.subscribe((params) => {
			if (this.filter !== params) {
				this.filter = { ... this.filter, ...params };
				this.fetchTracks(true);
			}
		});
		this.getGenres();
		this.getPlaylists();

	}

	public onFilter() {
		const queryParams: any = {};

		Object.keys(this.filter).map((key) => {
			if (this.filter[key] !== "" && this.filter[key] !== undefined) {
				queryParams[key] = this.filter[key];
			} else {
				queryParams[key] = null;
			}
		});

		console.log(queryParams);
		this.router.navigate(["."], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: "merge",
		});
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

		this.onFilter();
	}

	public onPlaylist() {
		this.modalService.show({
			component: PlaylistComponent,
			params: {
				playlists: this.playlists,
			}
		});
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
			this.playlists = [{ name: "Favorites", _id: "FAVOURITES" }].concat(response.playlists);
		});
	}

	public onScroll() {
		/*if (this.tracks.length > 0 && e.endIndex === this.tracks.length - 1) {
			if (this.tracks.length !== this.pagination.total) {
				this.pagination.skip += this.pagination.limit;
				this.fetchTracks();
			}
		}*/
		if (this.tracks.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			this.fetchTracks();
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
		const additionalParams = JSON.parse(JSON.stringify(this.filter));


		if (additionalParams.playlist && additionalParams.playlist !== "") {
			if (additionalParams.playlist === "FAVOURITES") {
				delete additionalParams.playlist;
				additionalParams.liked = true;
			}
		}

		this.musicService.getTracks({
			skip: this.pagination.skip,
			limit: this.pagination.limit,
			...additionalParams,
		}).subscribe((response: any) => {
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