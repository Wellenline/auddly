import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

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
	public loading = true;
	constructor(private httpService: HttpService) { }

	public ngOnInit(): void {

		this.fetchTracks();
	}

	public onScroll() {
		console.log("finished scrolling, load more");
		if (this.tracks.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			this.fetchTracks();
		}
	}

	private fetchTracks() {
		this.loading = true;
		this.httpService.get(`/tracks?skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.tracks = this.tracks.concat(response.tracks);
			this.pagination.total = response.total;
			this.loading = false;
		}, (err) => {
			console.log(err);
		});
	}
}
