import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-discover",
	templateUrl: "./discover.component.html",
	styleUrls: ["./discover.component.scss"],
})
export class DiscoverComponent implements OnInit {
	public albums = [];
	public artists = [];
	public tracks = [];
	public playlists = [];

	constructor(private httpService: HttpService) { }

	ngOnInit(): void {
		this.fetchAlbums();
		this.fetchArtists();
		this.fetchTracks();
		this.fetchPlaylists();
	}

	public fetchArtists() {
		this.httpService.get(`/artists/random?total=12`).subscribe((response: any[]) => {
			this.artists = response;
		});
	}

	public fetchAlbums() {
		this.httpService.get(`/albums/random?total=12`).subscribe((response: any[]) => {
			this.albums = response;
		});
	}

	public fetchTracks() {
		this.httpService.get(`/tracks/random?total=12`).subscribe((response: any[]) => {
			this.tracks = response;
		});
	}

	public fetchPlaylists() {
		this.httpService.get(`/playlists`).subscribe((response: any[]) => {
			this.playlists = response;
		});
	}

}
