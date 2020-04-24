import { Injectable } from "@angular/core";
import { ITrack } from "./player.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PlaylistService {
	public visible = false;
	public $track = new BehaviorSubject<ITrack>({});

	constructor() { }

}
