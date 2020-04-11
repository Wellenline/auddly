import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-artist",
	templateUrl: "./artist.component.html",
	styleUrls: ["./artist.component.scss"],
})
export class ArtistComponent implements OnInit {
	public artist: any = {};
	public albums = [];
	public tracks = [];

	constructor(private httpService: HttpService, private route: ActivatedRoute) { }

	public ngOnInit(): void {

		this.route.params.subscribe((params) => {
			this.getArtist(params.id);
			this.getAlbums(params.id);
			this.getPopular(params.id);
		});

	}

	public getArtist(id: string) {
		this.httpService.get(`/artists/${id}`).subscribe((response: any) => {
			this.artist = response;
		});
	}

	public getAlbums(id: string) {
		this.httpService.get(`/albums/artists/${id}`).subscribe((response: any) => {
			this.albums = response;
		});
	}

	public getPopular(id: string) {
		this.httpService.get(`/tracks/popular?artist=${id}`).subscribe((response: any) => {
			this.tracks = response.tracks;
		});
	}

}
