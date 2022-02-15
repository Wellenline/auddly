import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ITrack, PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-track-list",
	templateUrl: "./track-list.component.html",
	styleUrls: ["./track-list.component.scss"],
})
export class TrackListComponent implements OnInit {
	@Input() public track: ITrack = {};
	@Input() public options = {
		picture: true,
		actions: true,
	};

	@Output() public reload = new EventEmitter();
	constructor(public playerService: PlayerService, public httpService: HttpService) { }

	public ngOnInit(): void {
	}

	public onPlay(e) {
		console.log("Adding single track", this.track);
		this.playerService.onPlay(this.track);
	}

	public onPlaylist() {
		// todo
		/*this.httpService.get(`/playlists`).subscribe((response: { playlists: [{ name: any, id: number }] }) => {
			this.interfaceService.dialog.show({
				items: response.playlists.map((playlist) => playlist.name),
				type: "picker",
				title: "Playlist",
				message: "Choose the playlist you wish to add the track",
				closed: (index) => {
					if (index !== false && index !== undefined) {
						const playlist = response.playlists[index];
						if (this.track.playlists.findIndex((p) => p._id === playlist._id) === -1) {
							this._addToPlaylist(playlist);
						}

					}
				},
			});
		});*/
		this.playerService.onAddToPlaylist(this.track);

	}

	public onRemoveFromPlaylist() {
		this.playerService.onRemoveFromPlaylist(this.track);

		/*this.interfaceService.dialog.show({
			items: this.track.playlists.map((playlist) => playlist.name),
			type: "picker",
			title: "Playlist",
			message: "Choose the playlist you wish to remove the track from",
			closed: (index) => {
				console.log(index);
				if (index !== false && index !== undefined) {
					const playlist = this.track.playlists[index];
					this._removeFromPlaylist(playlist, index);

				}
			},
		});*/
	}

	public onQueue() {
		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(this.track);
		} else {
			this.playerService.queue([this.track]);
		}
		//this.interfaceService.notify(`${this.track.name} added to queue`);
	}

	private _addToPlaylist(playlist) {
		this.httpService.post(`/playlists/${playlist._id}`, {
			track: this.track._id,
		}).subscribe((response) => {
			//this.interfaceService.notify(`${this.track.name} added to ${playlist.name}`);
			this.track.playlists.push(playlist);
		});
	}

	private _removeFromPlaylist(playlist, index) {
		this.httpService.delete(`/playlists/${playlist._id}/${this.track._id}`).subscribe((response) => {
			//this.interfaceService.notify(`${this.track.name} removed from ${playlist.name}`);
			if (index > -1) {
				this.track.playlists.splice(index, 1);
			}
			this.reload.emit(true);
		});
	}


}
