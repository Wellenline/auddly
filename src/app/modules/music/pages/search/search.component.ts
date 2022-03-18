import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { debounce } from "src/app/utils";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { AlbumComponent } from "../../components/album/album.component";
import { ArtistComponent } from "../../components/artist/artist.component";
import { PlaylistComponent } from "../../components/playlist/playlist.component";
import { HttpService } from "src/app/core/services/http.service";
import { PlayerService } from "src/app/core/services/player.service";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
	public result = {
		albums: [],
		tracks: [],
		artists: [],
	};
	public playlists = [];

	public search: string;

	public loading = {
		albums: true,
		artists: true,
		tracks: true,
		playlists: true,
	};
	constructor(private httpService: HttpService, private modalService: ModalService, private playerService: PlayerService, private router: Router, private route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			if (params.q) {
				this.search = params.q;
				this.getSearchResults(params.q);
			} else {
				this.fetchAlbums();
				this.fetchArtists();
				this.fetchTracks();
				this.fetchPlaylists();
			}

		});
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

	public onPlayTracks() {
		if (this.result.tracks.length > 0) {
			this.playerService.onPlay(...this.result.tracks);
		}
	}
	@debounce(300)
	public onSearch(e) {
		const search = e.target.value && e.target.value.length >= 3 ? e.target.value : "";
		this.router.navigate(["."], { relativeTo: this.route, queryParams: { q: search } });
	}

	@debounce(300)
	public getSearchResults(search) {
		if (search.length < 3) {
			return;
		}
		this.loading = {
			artists: true,
			albums: true,
			playlists: true,
			tracks: true,
		};
		this.httpService.get(`/search?q=${search}`).subscribe((response: any) => {
			console.log(response);
			this.result = response;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = {
				artists: false,
				albums: false,
				playlists: false,
				tracks: false,
			};
		});
	}

	public fetchArtists() {
		this.loading.artists = true;
		this.httpService.get(`/artists/random?total=20`).subscribe((response: any) => {
			this.result.artists = response;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading.artists = false;
		});
	}

	public fetchAlbums() {
		this.loading.albums = true;

		this.httpService.get(`/albums/random?total=20`).subscribe((response: any) => {
			this.result.albums = response;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading.albums = false;
		});
	}

	public fetchTracks() {
		this.loading.tracks = true;

		this.httpService.get(`/tracks/random?total=20`).subscribe((response: any) => {
			this.result.tracks = response;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading.tracks = false;
		});
	}

	public fetchPlaylists() {
		this.loading.playlists = true;

		this.httpService.get(`/playlists`).subscribe((response: any) => {
			this.playlists = [{ name: "Favorites", _id: "FAVOURITES" }].concat(response.playlists);
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading.playlists = false;
		});
	}

	public onAddPlaylist() {
		this.modalService.show({
			component: PlaylistComponent,
			params: {
				action: "create"
			},
			callback: (playlist) => {
				this.fetchPlaylists();
			}

		});
	}
}
