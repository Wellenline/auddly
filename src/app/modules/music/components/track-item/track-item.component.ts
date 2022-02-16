import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MusicService } from "src/app/core/services/music.service";
import { ITrack, PlayerService } from "src/app/core/services/player.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { AlbumComponent } from "../album/album.component";
import { ArtistComponent } from "../artist/artist.component";
import { PlaylistComponent } from "../playlist/playlist.component";

@Component({
	selector: "app-track-item",
	templateUrl: "./track-item.component.html",
	styleUrls: ["./track-item.component.scss"]
})
export class TrackItemComponent implements OnInit {
	@Input() public track: ITrack = {};
	@Input() public options = {
		picture: true,
		actions: true,
	};

	@Output() public reload = new EventEmitter();
	public inPlaylist = false;
	constructor(public playerService: PlayerService, private route: ActivatedRoute,
		private musicService: MusicService, private toastService: ToastService, private modalService: ModalService) { }

	ngOnInit(): void {

		// check if track has the playlist
		if (this.route.snapshot.queryParams.playlist && this.track.playlists.length > 0) {
			const inPlaylist = this.track.playlists.find((p) => p._id === this.route.snapshot.queryParams.playlist);
			if (inPlaylist) {
				this.inPlaylist = true;
			}
		}

	}

	public onPlay(e) {
		console.log("Adding single track", this.track);
		this.playerService.onPlay(this.track);
	}

	public onPlaylist() {
		this.modalService.show({
			component: PlaylistComponent,
			params: {
				id: this.track._id,
				action: "add",
			},
			callback: (playlist) => {
				this.track.playlists.push(playlist);
				this.toastService.show({
					message: `${this.track.name} added to ${playlist.name}`,
				});
			}
		});
	}

	public onRemoveFromPlaylist() {
		this.musicService.removeTrackFromPlaylist(this.track._id, this.route.snapshot.queryParams.playlist).subscribe(() => {
			this.reload.emit();
		});
	}

	public onQueue() {
		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(this.track);
		} else {
			this.playerService.queue([this.track]);
		}
	}

	public onArtist(id: string) {
		this.modalService.show({
			component: ArtistComponent,
			class: "fullscreen",
			params: {
				id,
			}
		});
	}

	public onAlbum(id: string) {
		this.modalService.show({
			component: AlbumComponent,
			class: "fullscreen",
			params: {
				id,
			}
		});
	}

}
