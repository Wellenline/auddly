import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, fromEvent } from "rxjs";
import { startWith, debounceTime, map } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http.service";
import { MusicService } from "src/app/core/services/music.service";
import { PlayerService } from "src/app/core/services/player.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { PlaylistComponent } from "../../overlays/playlist/playlist.component";

@Component({
	selector: "app-tracks",
	templateUrl: "./tracks.component.html",
	styleUrls: ["./tracks.component.scss"]
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
	public filter: { limit?: string, liked?: boolean, genre?: string, sort?: string } = { sort: "-created_at", limit: "50", genre: "" };
	public limits = [10, 20, 30, 50, 100, 150, 200, 250, 300, 500, 1000, 2000, 5000, 10000];
	public scrollCallback: any;

	constructor(private httpService: HttpService,
		private host: ElementRef,
		private playerService: PlayerService,
		private musicService: MusicService, private modalService: ModalService, private route: ActivatedRoute, private router: Router) { }

	public ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			if (this.filter !== params) {
				this.filter = { ... this.filter, ...params };
				this.getTracks(true).subscribe();
			}
		});
		this.getGenres();

		this.scrollCallback = this.onScroll.bind(this);


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
		console.log(this.filter, key);
		this.filter.sort = this.filter.sort?.includes(key) ?
			(this.filter.sort.startsWith("-") ? this.filter.sort.replace("-", "") : `-${key}`) : key;

		this.onFilter();
	}

	public onLiked() {
		this.filter.liked = !this.filter.liked;
		this.onFilter();
	}



	public getGenres() {
		this.httpService.get(`/genres`).subscribe((response: any) => {
			this.genres = response.data;

			if (this.filter.genre) {
				this.genre = this.genres.find((genre) => genre._id === this.filter.genre);
			}
		});
	}

	public onScroll() {
		console.log("onScroll(), triggered");
		if (this.tracks.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			return this.getTracks();
		}

	}

	public getTracks(reset?: boolean) {
		this.loading = true;

		if (reset) {
			this.tracks = [];
			this.pagination.total = 0;
			this.pagination.skip = 0;
			this.pagination.limit = this.filter.limit ? Number(this.filter.limit) : 50;

		}
		const additionalParams = JSON.parse(JSON.stringify(this.filter));

		return this.musicService.getTracks({
			skip: this.pagination.skip,
			limit: this.pagination.limit,
			...additionalParams,
		}).pipe(
			map((res: any) => {
				this.tracks = this.tracks.concat(res.data);
				this.pagination.total = res.total;
				if (this.pagination.total) {
					this.pagination.total = res.total;
				}
				this.loading = false;

			}));

		// });
	}
}