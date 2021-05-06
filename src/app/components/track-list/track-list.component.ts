import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";
import { HttpService } from "src/app/services/http.service";
import { ITrack, PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-track-list",
	templateUrl: "./track-list.component.html",
	styleUrls: ["./track-list.component.scss"],
})
export class TrackListComponent implements OnInit {
	@Input() public track: ITrack = {};
	@Output() public reload = new EventEmitter();
	constructor(public playerService: PlayerService, public httpService: HttpService, private interfaceService: InterfaceService) { }

	public ngOnInit(): void {
	}

	public onPlay(e) {
		e.preventDefault();
		e.stopPropagation();
		console.log(JSON.stringify(this.track))
		this.playerService.onPlay(this.track);
	}

	onPlaylist() {
		// todo
		this.httpService.get(`/playlists`).subscribe((response: { playlists: [{ name: any, id: number }] }) => {
			this.interfaceService.dialog.show({
				items: response.playlists.map((playlist) => playlist.name),
				type: "picker",
				title: "Playlist",
				message: "Choose the playlist you wish to add the track",
				closed: (index) => {
					if (index !== false && index !== undefined) {
						const playlist = response.playlists[index];
						if (this.track.playlists.findIndex((p) => p.id === playlist.id) === -1) {
							this._addToPlaylist(playlist);
						}

					}
				},
			});
		});

	}

	public onRemoveFromPlaylist() {
		this.interfaceService.dialog.show({
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
		});
	}

	onQueue() {
		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(this.track);
		} else {
			this.playerService.queue([this.track]);
		}
		this.interfaceService.notify(`${this.track.name} added to queue`);
	}

	private _addToPlaylist(playlist) {
		this.httpService.post(`/playlists/${playlist.id}`, {
			track: this.track.id,
		}).subscribe((response) => {
			this.interfaceService.notify(`${this.track.name} added to ${playlist.name}`);
			this.track.playlists.push(playlist);
		});
	}

	private _removeFromPlaylist(playlist, index) {
		this.httpService.delete(`/playlists/${playlist.id}/${this.track.id}`).subscribe((response) => {
			this.interfaceService.notify(`${this.track.name} removed from ${playlist.name}`);
			if (index > -1) {
				this.track.playlists.splice(index, 1);
			}
			this.reload.emit(true);
		});
	}


}
