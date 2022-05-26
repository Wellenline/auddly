import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Cacheable, LocalStorageStrategy } from "ts-cacheable";
import { HttpService } from "./http.service";

@Injectable({
	providedIn: "root"
})
export class PlaylistService {
	public playlists = new BehaviorSubject([]);

	public static $cacheBuster = new Subject();
	constructor(private http: HttpService) { }

	@Cacheable({
		storageStrategy: LocalStorageStrategy,
		cacheBusterObserver: PlaylistService.$cacheBuster
	})
	public getPlaylists() {
		return this.http.get(`/playlists`);
	}

	public create(data: {}) {
		return this.http.post(`/playlists`, data);
	}

	public update(id: string, data: {}) {
		return this.http.put(`/playlists/${id}`, data);
	}

	public delete(id: string) {
		return this.http.delete(`/playlists/${id}`);
	}

	public addTrack(playlist: string, track: string) {
		return this.http.post(`/playlists/${playlist}`, { track });
	}

	public removeTrack(playlist: string, track: string) {
		return this.http.delete(`/playlists/${playlist}/${track}`);
	}
}
