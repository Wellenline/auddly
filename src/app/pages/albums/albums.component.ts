import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-albums",
	templateUrl: "./albums.component.html",
	styleUrls: ["./albums.component.scss"],
})
export class AlbumsComponent implements OnInit {
	public albums = [];
	public pagination = {
		total: 0,
		skip: 0,
		limit: 50,
	};
	public loading = true;
	constructor(private httpService: HttpService) { }

	public ngOnInit() {
		this.fetchAlbums();
		// this.tweets$ = this.tweetsQuery.selectAll();
		// this.isLoading$ = this.tweetsQuery.selectLoading();
	}

	public onScroll() {
		if (this.albums.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			this.fetchAlbums();
		}

	}

	private fetchAlbums() {
		this.loading = true;
		this.httpService.get(`/albums?skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.albums = this.albums.concat(response.albums);
			this.pagination.total = response.total;
			this.loading = false;
		}, (err) => {
			console.log(err);
		});
	}
}
