import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-playlists",
	templateUrl: "./playlists.component.html",
	styleUrls: ["./playlists.component.scss"],
})
export class PlaylistsComponent implements OnInit {
	public playlists = [];

	constructor(private httpService: HttpService) { }
	ngOnInit(): void {
		this.fetchPlaylists();
	}
	public fetchPlaylists() {
		this.httpService.get(`/playlists`).subscribe((response: any) => {
			this.playlists = [{ name: "Favorites", id: "FAVOURITES" }].concat(response.playlists);
		});
	}

}
