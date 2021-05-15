import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpService } from "./http.service";
export interface ILibraryPagination {
	skip: number;
	limit: number;
}
@Injectable({
	providedIn: "root"
})
export class LibraryService {
	public $albums = new BehaviorSubject([]);
	public $artists = new BehaviorSubject([]);
	public $playlists = new BehaviorSubject([]);
	public $loading = new Subject();

	public pagination = {
		total: 0,
		skip: 0,
		limit: 50,
	};
	constructor(private httpService: HttpService) { }

	public getArtists(pagination: ILibraryPagination) {

	}

	public getAlbums(pagination: ILibraryPagination) {
		console.log("loading albums")
		this.$loading.next(true);
		this.httpService.get(`/albums?skip=${pagination.skip}&limit=${pagination.limit}`).subscribe((response: any) => {

			const albums = this.$albums.getValue();

			this.$albums.next(albums.concat(response.albums));
			this.pagination.total = response.total;

		}, (err) => {
			console.log(err);
		}).add(() => {
			this.$loading.next(false);
		});
	}

	public getPlaylists(pagination: ILibraryPagination) {

	}
}
