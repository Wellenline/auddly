import { Component, OnInit } from "@angular/core";
import { MusicService } from "src/app/core/services/music.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";

@Component({
	selector: "app-playlist",
	templateUrl: "./playlist.component.html",
	styleUrls: ["./playlist.component.scss"]
})
export class PlaylistComponent implements OnInit {

	public playlists = [];

	public loading = true;

	public error: string;
	public roles = [];
	constructor(public modalComponent: ModalComponent, private musicService: MusicService) { }


	ngOnInit(): void {
		this.getPlaylists();
	}

	getPlaylists() {
		this.musicService.getPlaylists().subscribe((response: { playlists: [] }) => {
			this.playlists = response.playlists;
		}).add(() => {
			this.loading = false;
		});
	}

	onHandleAction(playlist) {
		if (!this.modalComponent.params.id) {
			return;
		}

		if (this.modalComponent.params.action === "add") {
			return this.onAddToPlayist(playlist);
		}
	}



	onAddToPlayist(playlist) {
		if (this.modalComponent.params.id) {
			this.musicService.addTrackToPlaylist(playlist._id, this.modalComponent.params.id).subscribe((response: { playlist: any }) => {
				this.modalComponent.onClose(playlist);
			}, (err) => {
				alert(err);
			});
		}
		// this.invites.push({});
	}

	onCreate() {
		const name = prompt("Enter playlist name");
		if (name) {
			this.musicService.createPlaylist({ name }).subscribe((playlist) => {
				this.playlists.push(playlist);
				if (this.modalComponent.params.action === "create") {
					this.modalComponent.onClose(playlist);

				}
			}, (err) => {
				alert(err);
			});
		}
	}

	onEdit(playlist) {
		const name = prompt("Enter new name", playlist.name);
		if (name) {
			this.musicService.updatePlaylist(playlist._id, { name }).subscribe((response: { playlist: any }) => {
				playlist.name = name;
			}, (err) => {
				alert(err);
			});
		}
	}

	onDelete(playlist) {
		if (confirm("Are you sure you want to delete this playlist?")) {
			this.musicService.deletePlaylist(playlist._id).subscribe((response: { playlist: any }) => {
				this.playlists = this.playlists.filter(p => p._id !== playlist._id);
			}, (err) => {
				alert(err);
			});
		}
	}

	onRemoveInvite(index) {
		// this.invites.splice(index, 1);
	}

	onSend() {
		// todo


	}

	onClose() {
		// reset invites
		this.modalComponent.onClose();


	}


}
