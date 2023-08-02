import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MusicService } from "src/app/core/services/music.service";
import { ITrack, PlayerService } from "src/app/core/services/player.service";
import { PlaylistService } from "src/app/core/services/playlist.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { ArtistComponent } from "../artist/artist.component";
import { PlaylistFormComponent } from "../playlist-form/playlist-form.component";
import { SidebarComponent } from "src/app/standalone/sidebar/sidebar.component";
import { SlideRight } from "src/app/animations/slide";

@Component({
	selector: "app-playlist",
	templateUrl: "./playlist.component.html",
	styleUrls: ["./playlist.component.scss"],
	animations: [SlideRight]

})
export class PlaylistComponent implements OnInit {

	public playlist: {
		name?: string;
		_id?: string;
		tracks?: ITrack[];
		picture?: string;
		created_by?: {
			first_name?: string,
			last_name?: string,
		}
	} = {};
	public tracks: ITrack[] = [];
	public loading = true;
	public albums = [];

	constructor(public modal: SidebarComponent,
		private playerService: PlayerService,
		private toastService: ToastService,
		private musicService: MusicService,
		private playlistService: PlaylistService,
		private location: Location,
		private modalService: ModalService) { }

	ngOnInit(): void {
		console.log(this.modal.params);
		this.getPlaylist(this.modal.params.id);
	}
	public getPlaylist(id: string) {
		this.tracks = [];
		this.loading = true;
		this.playlistService.getPlaylist(id).subscribe((response: { tracks: ITrack[] }) => {
			this.playlist = response;
			if (this.playlist.tracks.length > 0 && !this.playlist.picture) {
				this.playlist.picture = this.playlist.tracks[0].album.picture;
			}
		}, (err) => {
			console.log("Failed to load tracks", err);
		}).add(() => this.loading = false);
	}

	public onEdit(playlist) {
		this.modalService.show({
			component: PlaylistFormComponent,
			params: {
				playlist: {
					_id: playlist._id,
					name: playlist.name,
				}
			},
			callback: (response: any) => {
				if (response) {
					this.getPlaylist(this.playlist._id);
				}
			}
		});
	}

	public onPlay() {
		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(...this.playlist.tracks);
		} else {
			this.playerService.queue(this.playlist.tracks);
		}
		this.toastService.show({
			message: `${this.playlist.tracks.length} tracks added to queue`,
		});

	}

	public onProfile(id: string) {
		// todo: open profile modal
	}
	public onDelete() {
		if (confirm("Are you sure you want to delete this playlist?")) {
			this.playlistService.delete(this.playlist._id).subscribe({
				next: (response: any) => {
					this.location.back();
				},
				error: (err) => {
					console.log(err);
				}
			});
		}

	}
	public onRemove(track: ITrack) {
		console.log("Event Tirggered")
		this.playlistService.removeTrack(this.playlist._id, track._id).subscribe({
			next: (response: any) => {
				this.playlist.tracks = this.playlist.tracks.filter(t => t._id !== track._id);
				this.toastService.show({
					message: `${track.name} removed from the playlist!`,
				});
			},
			error: (err) => {
				console.log(err);
			}
		});
	}

}
