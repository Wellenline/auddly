import { Injectable } from "@angular/core";
export interface ITrack {
	_id?: string;
	picture?: string;
	duration?: number;
	playing?: boolean;
	plays?: number;
	artist?: any;
	album?: any;
	path?: string;
	name?: string;
	source?: string;
	favourited?: boolean;
}

@Injectable({
	providedIn: "root",
})
export class PlayerService {

	constructor() { }
}
