import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cacheable, LocalStorageStrategy } from "ts-cacheable";
import { HttpService } from "./http.service";

@Injectable({
	providedIn: "root"
})
export class MusicService {
	public artists = new BehaviorSubject([]);
	public albums = new BehaviorSubject([]);
	public playlists = new BehaviorSubject([]);
	public tracks = new BehaviorSubject([]);


	constructor(private http: HttpService) { }

	public getPlaylists() {
		return this.http.get(`/playlists`);
	}

	public getArtists(params: {}) {
		return this.http.get(`/artists?${Object.keys(params).map(key => key + "=" + params[key]).join("&")}`);
	}

	@Cacheable({
		storageStrategy: LocalStorageStrategy,
	})
	public getArtist(id: string) {
		return this.http.get(`/artists/${id}`);
	}

	public getAlbums(params: {}) {
		return this.http.get(`/albums?${Object.keys(params).map(key => key + "=" + params[key]).join("&")}`);
	}

	@Cacheable({
		storageStrategy: LocalStorageStrategy,
	})
	public getAlbum(id: string) {
		return this.http.get(`/albums/${id}`);
	}

	@Cacheable({
		storageStrategy: LocalStorageStrategy,
	})
	public getTracks(params: {}) {
		return this.http.get(`/tracks?${Object.keys(params).map(key => key + "=" + params[key]).join("&")}`);
	}

	public search(query: string) {
		return this.http.get(`/search?q=${query}`);
	}

}
