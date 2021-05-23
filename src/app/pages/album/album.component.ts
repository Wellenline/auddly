import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { PlayerService, ITrack } from "src/app/services/player.service";
import { ActivatedRoute } from "@angular/router";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit {
	public album: any = {};
	public tracks: ITrack[] = [];
	public duration = 0;
	public loading = true;
	constructor(private httpService: HttpService, private playerService: PlayerService, private route: ActivatedRoute, private interfaceService: InterfaceService) { }

	public ngOnInit(): void {

		this.route.params.subscribe((params) => {
			this.getTracks(params.id);
			this.getAlbum(params.id);
		});

	}

	public getTracks(id: string) {
		this.httpService.get(`/tracks?album=${id}&skip=0&limit=1500`).subscribe((response: any) => {
			this.tracks = this.tracks.concat(response.tracks);

			this.tracks.map((track) => {
				if (track.duration) {
					this.duration += track.duration;
				}
			})
		}, (err) => {
			console.log("Failed to load tracks", err);
		});
	}

	public onPlayAlbum() {

		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(...this.tracks);
		} else {
			this.playerService.queue(this.tracks);
		}
		this.interfaceService.notify(`${this.tracks.length} tracks added to queue`, {
			timeout: 3000,
		});

		// this.playerService.onPlay(...this.tracks);
	}

	public getAlbum(id: string) {
		this.loading = true;
		this.httpService.get(`/albums/${id}`).subscribe((response: any) => {
			this.album = response;
		}, (err) => {
			console.log("Failed to load album", err);
		}).add((loading) => {
			this.loading = false;
		});
	}

}
