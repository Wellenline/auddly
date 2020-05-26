import { Component, OnInit } from "@angular/core";
import { debounce } from "src/app/utils";
import { HttpService } from "src/app/services/http.service";
import { Router, ActivatedRoute } from "@angular/router";

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
	};
	public search: string;
	constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			if (params.q) {
				this.search = params.q;
				this.getSearchResults(params.q);
			} else {
				this.fetchAlbums();
				this.fetchArtists();
				this.fetchTracks();
			}

		});
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
		this.httpService.get(`/artists/random?total=12`).subscribe((response: any) => {
			this.result.artists = response;
		});
	}

	public fetchAlbums() {
		this.httpService.get(`/albums/random?total=12`).subscribe((response: any) => {
			this.result.albums = response;
		});
	}

	public fetchTracks() {
		this.httpService.get(`/tracks/random?total=12`).subscribe((response: any) => {
			this.result.tracks = response;
		});
	}
}
