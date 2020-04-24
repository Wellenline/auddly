import { Component, OnInit, HostListener } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { PlaylistService } from "src/app/services/playlist.service";
import { DialogService } from "src/app/services/dialog.service";
import { ToastService } from "src/app/services/toast.service";
import { ITrack } from "src/app/services/player.service";

@Component({
	selector: "app-playlist-form",
	templateUrl: "./playlist-form.component.html",
	styleUrls: ["./playlist-form.component.scss"],
})
export class PlaylistFormComponent implements OnInit {
	public playlists = [];
	public track: ITrack = {};
	// tslint:disable-next-line:max-line-length
	constructor(private httpService: HttpService, private dialogService: DialogService, private toastService: ToastService, public playlistService: PlaylistService) { }

	ngOnInit(): void {
		this.playlistService.$track.subscribe((track) => {
			this.track = track;
			this.getPlaylists();
		});
	}

	public getPlaylists() {
		this.httpService.get(`/playlists`).subscribe((response: any) => {
			this.playlists = response;

		});
	}

	public onDelete(e, playlist) {
		e.stopPropagation();
		e.preventDefault();
		this.dialogService.show({
			title: "Confirm",
			message: `Are you sure you wish to delete ${playlist.name} playlist?`,
			type: "confirm",
			okButtonText: "Delete",
			cancelButtonText: "Cancel",
			closed: (value) => {
				if (value) {
					this.httpService.delete(`/playlists/${playlist._id}`).subscribe((response) => {
						this.toastService.show("Playlist deleted", {
							timeout: 3000,
						});
						this.getPlaylists();
					});
				}
			},
		});
	}

	public onCreate() {
		this.dialogService.show({
			title: "Playlist Name",
			message: `Please enter a playlist name`,
			type: "prompt",
			value: "",
			okButtonText: "Save",
			closed: (value) => {
				if (value) {
					this.httpService.post(`/playlists`, {
						name: value,
					}).subscribe((response) => {
						this.getPlaylists();
						this.toastService.show("Playlist created!", {
							timeout: 3000,
						});
					});
				}
			},
		});
	}

	public onAddToPlaylist(playlist) {
		if (this.track) {
			this.httpService.get(`/playlists/${playlist._id}/${this.track._id}`).subscribe((response) => {
				this.toastService.show(`${this.track.name} added to ${playlist.name}`, {
					timeout: 3000,
				});
				this.getPlaylists();
				this.playlistService.visible = false;
			});
		}
	}

	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(e: KeyboardEvent) {
		this.playlistService.visible = false;
	}

}
