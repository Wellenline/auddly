import { Component, OnInit, Input } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { PlaylistService } from "src/app/services/playlist.service";
import { HttpService } from "src/app/services/http.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "app-track-options",
	templateUrl: "./track-options.component.html",
	styleUrls: ["./track-options.component.scss"],
})
export class TrackOptionsComponent implements OnInit {
	@Input() public track: ITrack;
	@Input() public options: { queue: boolean, download?: boolean, playlist?: boolean } = { queue: true };

	public playlists = [];
	public showModal = false;
	// tslint:disable-next-line:max-line-length
	constructor(private playlistService: PlaylistService, private toastService: ToastService, private playerService: PlayerService, public httpService: HttpService) { }

	ngOnInit(): void {
	}

	onPlaylist() {
		this.playlistService.visible = true;
		this.playlistService.$track.next(this.track);
	}

	onQueue() {
		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(this.track);
		} else {
			this.playerService.queue([this.track]);
		}
		this.toastService.show(`${this.track.name} added to queue`, {
			timeout: 3000,
		});
	}

}
