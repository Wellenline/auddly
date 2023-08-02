import { Component, OnInit } from "@angular/core";
import { MusicService } from "src/app/core/services/music.service";
import { PlayerService } from "src/app/core/services/player.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { AlbumComponent } from "../album/album.component";
import { SearchComponent } from "../search/search.component";
import { forkJoin } from "rxjs";
import { SlideRight } from "src/app/animations/slide";
import { SidebarComponent } from "src/app/standalone/sidebar/sidebar.component";
import { SidebarService } from "src/app/standalone/sidebar/sidebar.service";

@Component({
	selector: "app-artist",
	templateUrl: "./artist.component.html",
	styleUrls: ["./artist.component.scss"],
	animations: [SlideRight]

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
	constructor(public modal: SidebarComponent,
		private toastService: ToastService,
		private playerService: PlayerService,
		private musicService: MusicService,
		private modalService: SidebarService) { }

	ngOnInit(): void {
		this.getData(this.modal.params.id);
	}

	public getData(id: string) {
		this.loading = true;
		forkJoin([
			this.musicService.getArtist(id),
			this.musicService.getAlbums({
				artist: id,
			}),
			this.musicService.getTracks({
				popular: true,
				artist: id,
				limit: 10,
			})
		]).subscribe((data: unknown) => {
			this.artist = data[0];
			if (this.artist.name) {
				this.getSearchResults(this.artist.name);
			}

			this.albums = data[1].data;
			this.tracks = data[2].data;

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
		this.modalService.show({
			component: SearchComponent,
			params: {
				q: similar
			}
		});
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
