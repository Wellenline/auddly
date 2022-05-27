import { Component, OnInit } from "@angular/core";
import { MusicService } from "src/app/core/services/music.service";
import { PlayerService } from "src/app/core/services/player.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { AlbumComponent } from "../album/album.component";

@Component({
	selector: "app-artist",
	templateUrl: "./artist.component.html",
	styleUrls: ["./artist.component.scss"]
})
export class ArtistComponent implements OnInit {
	public artist: any = {};
	public albums = [];
	public tracks = [];
	public loading = true;
	public result = {
		albums: [],
		tracks: [],
		artists: [],
		playlists: [],
	};
	constructor(public modal: ModalComponent,
		private toastService: ToastService,
		private playerService: PlayerService,
		private musicService: MusicService,
		private modalService: ModalService) { }

	ngOnInit(): void {
		this.getData(this.modal.params.id);
	}

	public getData(id: string) {
		this.getArtist(id);
		this.getAlbums(id);
		this.getPopular(id);
	}

	public getArtist(id: string) {
		this.loading = true;
		this.musicService.getArtist(id).subscribe((response: any) => {
			this.artist = response;
			this.getSearchResults(this.artist.name);
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}

	public getAlbums(id: string) {
		this.loading = true;
		this.musicService.getAlbums({
			artist: id,
		}).subscribe((response: any) => {
			this.albums = response.data;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}

	public getPopular(id: string) {
		this.loading = true;
		this.musicService.getTracks({
			popular: true,
			artist: id,
			limit: 10,
		}).subscribe((response: any) => {
			this.tracks = response.data;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}

	public onPlayTracks() {
		if (this.tracks.length > 0) {
			this.playerService.onPlay(...this.tracks);
		}
	}

	public getSearchResults(search) {
		if (search.length < 3) {
			return;
		}

		this.musicService.search(search).subscribe((response: any) => {
			this.result = response;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}


	public onSearch(similar) {
		/*this.router.navigate(["", {
			outlets: { modal: null, primary: "search" },
		}], {
			queryParams: {
				q: similar,
			}
		});*/
		// [routerLink]="['/search', {outlets: {modal: [null]}}]" [queryParams]="{ q: similar }"
	}

	public onAlbum(id: string) {
		this.modalService.show({
			component: AlbumComponent,
			class: "fullscreen",
			params: {
				id
			}
		});
	}
}
