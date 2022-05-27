import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MusicService } from "src/app/core/services/music.service";
import { ITrack, PlayerService } from "src/app/core/services/player.service";
import { PlaylistService } from "src/app/core/services/playlist.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { AlbumComponent } from "../album/album.component";
import { ArtistComponent } from "../artist/artist.component";
import { PlaylistItemsComponent } from "../playlist-items/playlist-items.component";
import { PlaylistComponent } from "../playlist/playlist.component";

@Component({
	selector: "app-track-item",
	templateUrl: "./track-item.component.html",
	styleUrls: ["./track-item.component.scss"]
})
export class TrackItemComponent implements OnInit {
	@Input() public track: ITrack = {};
	@Input() public options: {
		actions: boolean;
		picture: boolean;
		playlist?: boolean;
		drag: boolean;
	} = {
			picture: true,
			actions: true,
			drag: false,
		};

	@Output() public reload = new EventEmitter();
	@Output() public onRemoveFromPlaylist = new EventEmitter();

	constructor(public playerService: PlayerService, private route: ActivatedRoute,
		private musicService: MusicService, private playlistService: PlaylistService, private toastService: ToastService, private modalService: ModalService) { }

	ngOnInit(): void {

	}

	public onPlay(e) {
		console.log("Adding single track", this.track);
		this.playerService.onPlay(this.track);
	}

	public onPlaylist() {
		this.modalService.show({
			component: PlaylistItemsComponent,
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
