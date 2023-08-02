import { Component, OnInit } from "@angular/core";
import { MusicService } from "src/app/core/services/music.service";
import { ITrack, PlayerService } from "src/app/core/services/player.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { ArtistComponent } from "../artist/artist.component";
import { forkJoin } from "rxjs";
import { SidebarComponent } from "src/app/standalone/sidebar/sidebar.component";
import { SlideRight } from "src/app/animations/slide";
import { SidebarService } from "src/app/standalone/sidebar/sidebar.service";

@Component({
	selector: "app-album",
	templateUrl: "./album.component.html",
	styleUrls: ["./album.component.scss"],
	animations: [SlideRight]

})
export class AlbumComponent implements OnInit {
	public album: any = {};
	public tracks: ITrack[] = [];
	public loading = true;
	public albums = [];

	constructor(public modal: SidebarComponent,
		private playerService: PlayerService,
		private toastService: ToastService,
		private musicService: MusicService,
		private modalService: SidebarService) { }

	ngOnInit(): void {
		this.getAlbum(this.modal.params.id);
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

			forkJoin([
				this.musicService.getTracks({
					album: id,
					skip: 0,
					limit: 1000,
				}),
				this.musicService.getAlbums({
					artist: this.album.artist._id
				})
			]).subscribe((responses: any) => {
				this.tracks = responses[0].data;
				this.albums = responses[1].data.filter((album) => album._id !== this.album._id);
			}, (err) => {
				console.log(err);
			}).add(() => {
				this.loading = false;
			});


		}, (err) => {
			console.log("Failed to load album", err);
			this.modal.onClose();
		})
	}

}
