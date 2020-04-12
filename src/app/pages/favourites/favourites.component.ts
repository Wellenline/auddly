import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-favourites",
	templateUrl: "./favourites.component.html",
	styleUrls: ["./favourites.component.scss"],
})
export class FavouritesComponent implements OnInit {
	public tracks = [];
	public pagination = {
		total: 0,
		skip: 0,
		limit: 20,
	};
	public loading = true;
	constructor(private httpService: HttpService, private playerService: PlayerService) { }

	public ngOnInit(): void {
		this.fetchTracks();
	}

	public onPlayAll() {
		this.playerService.onPlay(...this.tracks);
	}

	public onScroll() {
		if (this.tracks.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			this.fetchTracks();
		}
	}

	private fetchTracks() {
		this.loading = true;
		this.httpService.get(`/tracks?favourites=true&skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.tracks = this.tracks.concat(response.tracks);
			this.pagination.total = response.total;
			this.loading = false;
		}, (err) => {
			console.log(err);
		});
	}
}
