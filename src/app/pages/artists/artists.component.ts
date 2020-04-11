import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-artists",
	templateUrl: "./artists.component.html",
	styleUrls: ["./artists.component.scss"],
})
export class ArtistsComponent implements OnInit {
	public artists = [];
	public pagination = {
		total: 0,
		skip: 0,
		limit: 50,
	};
	public loading = true;
	constructor(private httpService: HttpService) { }

	public onScroll() {
		if (this.artists.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			this.fetchArtists();
		}

	}

	public ngOnInit(): void {
		this.fetchArtists();
	}

	public fetchArtists() {
		this.loading = true;
		this.httpService.get(`/artists?skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.artists = this.artists.concat(response.artists);
			this.pagination.total = response.total;
			this.loading = false;
		});
	}

}
