import { Component, OnInit } from "@angular/core";
import { MusicService } from "src/app/core/services/music.service";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { ArtistComponent } from "../artist/artist.component";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"]
})
export class AlbumComponent implements OnInit {
	public album: any = {};
	public tracks: ITrack[] = [];
	public loading = true;
	public albums = [];

	constructor(public modal: ModalComponent,
		private playerService: PlayerService,
		private toastService: ToastService,
		private musicService: MusicService,
		private modalService: ModalService) { }

	ngOnInit(): void {
		this.getAlbum(this.modal.params.id);
	}

	public getTracks(id: string) {
		this.tracks = [];
		this.musicService.getTracks({
			album: id,
			skip: 0,
			limit: 1000,
		}).subscribe((response: { tracks: ITrack[] }) => {
			this.tracks = response.tracks;
		}, (err) => {
			console.log("Failed to load tracks", err);
		});
	}

	public onPlayAlbum() {
		if (!this.playerService.$playing.getValue()) {
			this.playerService.onPlay(...this.tracks);
		} else {
			this.playerService.queue(this.tracks);
		}
		this.toastService.show({
			message: `${this.tracks.length} tracks added to queue`,
		});
		/*this.interfaceService.notify(`${this.tracks.length} tracks added to queue`, {
			timeout: 3000,
		});*/
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

	public getAlbum(id: string) {
		this.loading = true;
		this.tracks = [];
		this.albums = [];
		this.musicService.getAlbum(id).subscribe((response: any) => {
			this.album = response;
			this.getTracks(id);

			this.getAlbums(this.album.artist._id);

		}, (err) => {
			console.log("Failed to load album", err);
		}).add(() => {
			this.loading = false;
		});
	}

	public getAlbums(id: string) {
		this.loading = true;
		this.musicService.getAlbums({
			artist: id
		}).subscribe((response: any) => {
			this.albums = response.albums.filter((album) => album._id !== this.album._id);
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}
}
