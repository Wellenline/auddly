import { Component, OnInit, Input } from "@angular/core";
import { ITrack } from "src/app/services/player.service";
import { PlaylistService } from "src/app/services/playlist.service";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-track-options",
	templateUrl: "./track-options.component.html",
	styleUrls: ["./track-options.component.scss"],
})
export class TrackOptionsComponent implements OnInit {
	@Input() public track: ITrack;
	public playlists = [];
	public showModal = false;
	constructor(private playlistService: PlaylistService, public httpService: HttpService) { }

	ngOnInit(): void {
	}

	onPlaylist() {
		this.playlistService.visible = true;
		this.playlistService.$track.next(this.track);
	}

}
