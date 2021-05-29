import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InterfaceService } from "src/app/modules/shared/services/interface.service";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-library",
	templateUrl: "./library.component.html",
	styleUrls: ["./library.component.scss"]
})
export class LibraryComponent implements OnInit {
	public tab = 0;
	public playlists = [];
	public artists = [];
	public albums = [];
	public pagination = {
		total: 0,
		skip: 0,
		limit: 50,
	};
	public get canLoadMore() {
		if (this.tab === 2) {
			return false;
		}

		return this.tab === 0 ?
			this.pagination.total !== this.albums.length :
			this.pagination.total !== this.artists.length;
	}
	public loading = true;
	public height = 0;
	constructor(private httpService: HttpService, private interfaceService: InterfaceService, private router: Router, private route: ActivatedRoute) { }

	public onScroll() {
		if (this.tab === 1) {
			if (this.artists.length !== this.pagination.total) {
				this.pagination.skip += this.pagination.limit;
				this.fetchArtists();
			}
		} else {
			if (this.albums.length !== this.pagination.total) {
				this.pagination.skip += this.pagination.limit;
				this.fetchAlbums();
			}
		}



	}


	public ngOnInit(): void {
		switch (this.router.url) {
			case "/library/artists":
				this.tab = 1;
				this.fetchArtists();
				break;
			case "/library/albums":
				this.tab = 0;
				this.fetchAlbums();
				break;
			case "/library/playlists":
				this.tab = 2;
				this.fetchPlaylists();
				break;

			default:
				break;
		}
	}

	public fetchArtists() {
		this.loading = true;
		this.httpService.get(`/artists?skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.artists = this.artists.concat(response.artists);
			this.pagination.total = response.total;
			this.loading = false;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}

	private fetchAlbums() {
		this.loading = true;
		this.httpService.get(`/albums?skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.albums = this.albums.concat(response.albums);
			this.pagination.total = response.total;
			this.loading = false;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}

	setTab(index: number) {
		this.pagination = {
			total: 0,
			skip: 0,
			limit: 100,
		};
		this.tab = index;

		this.router.navigate(["/library"], {
			queryParams: {
				tab: this.tab,
			}, queryParamsHandling: "merge",
		});
	}


	public fetchPlaylists() {
		this.loading = true;
		this.httpService.get(`/playlists`).subscribe((response: any) => {
			this.playlists = response.playlists;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = false;
		});
	}

	public onCreate() {
		this.interfaceService.dialog.show({
			title: "Playlist Name",
			message: `Please enter a playlist name`,
			type: "prompt",
			okButtonText: "Save",
			closed: (value) => {
				if (value) {
					this.httpService.post(`/playlists`, {
						name: value,
					}).subscribe((response) => {
						this.fetchPlaylists();
						this.interfaceService.notify("Playlist created!");
					});
				}
			},
		});
	}

	public onEdit(playlist) {
		this.interfaceService.dialog.show({
			title: "Playlist Name",
			message: `Please enter a playlist name`,
			type: "prompt",
			default: playlist.name,
			okButtonText: "Save",
			closed: (value) => {
				if (value && value !== playlist.name) {
					this._onUpdatePlaylist(playlist._id, value);
				}
			},
		});
	}

	public onDelete(playlist) {
		this.interfaceService.dialog.show({
			title: "Confirm",
			message: `Are you sure you wish to delete ${playlist.name} playlist?`,
			type: "confirm",
			okButtonText: "Yes",
			cancelButtonText: "No",
			closed: (value) => {
				if (value) {
					this._onDeletePlaylist(playlist._id);
				}
			},
		});
	}

	private _onDeletePlaylist(id: number) {
		this.httpService.delete(`/playlists/${id}`).subscribe((response) => {
			this.interfaceService.notify("Playlist deleted");
			this.fetchPlaylists();
		});
	}

	private _onUpdatePlaylist(id: number, name: string) {
		this.httpService.put(`/playlists/${id}`, {
			name,
		}).subscribe((response) => {
			this.interfaceService.notify("Playlist updated!");
			this.fetchPlaylists();
		});
	}
}
