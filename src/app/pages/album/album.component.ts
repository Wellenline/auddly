import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { PlayerService, ITrack } from "src/app/services/player.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit {
	public album: any = {};
	public tracks: ITrack[] = [];

	constructor(private httpService: HttpService, private playerService: PlayerService, private route: ActivatedRoute) { }

	public ngOnInit(): void {

		this.route.params.subscribe((params) => {
			this.getTracks(params.id);
			this.getAlbum(params.id);
		});

	}

	public getTracks(id: string) {
		this.httpService.get(`/tracks?album=${id}&skip=0&limit=1500`).subscribe((response: any) => {
			this.tracks = this.tracks.concat(response.tracks);
		}, (err) => {
			console.log("Failed to load tracks", err);
		});
	}

	public onPlayAlbum() {
		this.playerService.onPlay(...this.tracks);
	}

	public getAlbum(id: string) {
		this.httpService.get(`/albums/${id}`).subscribe((response: any) => {
			this.album = response;
		}, (err) => {
			console.log("Failed to load album", err);
		});
	}

}
