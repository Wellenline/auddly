import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ActivatedRoute } from "@angular/router";
import { ITrack, PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-playlist",
	templateUrl: "./playlist.component.html",
	styleUrls: ["./playlist.component.scss"],
})
export class PlaylistComponent implements OnInit {
	public playlist: { name?: string, tracks: ITrack[] } = {
		tracks: [],
	};
	constructor(private httpService: HttpService, private route: ActivatedRoute, private playerService: PlayerService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			if (params.id) {
				this.fetchPlaylist(params.id);
			}
		});
	}

	public onPlayAll() {
		this.playerService.onPlay(...this.playlist.tracks);
	}

	public fetchPlaylist(id: string) {
		this.httpService.get(`/playlists/${id}`).subscribe((response: any) => {
			this.playlist = response;
		});
	}

}
