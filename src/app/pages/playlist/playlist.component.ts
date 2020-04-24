import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { DialogService } from "src/app/services/dialog.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "app-playlist",
	templateUrl: "./playlist.component.html",
	styleUrls: ["./playlist.component.scss"],
})
export class PlaylistComponent implements OnInit {
	public playlist: { _id?: string, name?: string, tracks: ITrack[] } = {
		tracks: [],
	};

	public trackCache = [];

	public state = 0;

	constructor(
		private router: Router,
		private httpService: HttpService,
		private route: ActivatedRoute,
		private playerService: PlayerService,
		private toastService: ToastService, private dialogService: DialogService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			if (params.id) {
				this.fetchPlaylist(params.id);
			}
		});
	}

	public onEdit() {
		this.dialogService.show({
			title: "Playlist",
			message: `Update playlist name`,
			type: "prompt",
			value: this.playlist.name,
			okButtonText: "Save",
			closed: (value) => {
				if (value) {
					this.httpService.put(`/playlists/${this.playlist._id}`, {
						name: value,
					}).subscribe((response) => {
						this.playlist.name = value;
						this.toastService.show("Playlist name updated!", {
							timeout: 3000,
						});
					});
				}
			},
		});
	}

	public onDelete() {
		this.dialogService.show({
			title: "Confirm",
			message: `Are you sure you wish to delete ${this.playlist.name} playlist?`,
			type: "confirm",
			okButtonText: "Delete",
			cancelButtonText: "Cancel",
			closed: (value) => {
				if (value) {
					this.httpService.delete(`/playlists/${this.playlist._id}`).subscribe((response) => {
						this.toastService.show("Playlist deleted", {
							timeout: 3000,
						});
						this.router.navigate(["/discover"]);
					});
				}
			},
		});
	}

	public onRemove(track) {
		const index = this.playlist.tracks.findIndex((t) => t._id === track._id);

		if (index > -1) {
			this.playlist.tracks.splice(index, 1);
		}
	}

	public onUpdate() {
		this.trackCache = [...this.playlist.tracks];
		this.state = 1;
	}

	public onCancel() {
		this.playlist.tracks = this.trackCache;
		this.state = 0;
	}

	public onSave() {
		this.httpService.put(`/playlists/${this.playlist._id}`, {
			name: this.playlist.name,
			tracks: this.playlist.tracks.map((track) => track._id),
		}).subscribe((response) => {
			this.toastService.show("Playlist updated!", {
				timeout: 3000,
			});

			this.state = 0;
		});
	}

	public onPlayAll() {
		this.playerService.onPlay(...this.playlist.tracks);
	}

	public fetchPlaylist(id: string) {
		this.httpService.get(`/playlists/${id}`).subscribe((response: any) => {
			this.playlist = response;

			this.trackCache = this.playlist.tracks;
		});
	}

}
