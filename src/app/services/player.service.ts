import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { getBoolean } from "../utils";
import { HttpService } from "./http.service";

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
	public $queue = new BehaviorSubject<ITrack[]>([]);
	public $track = new BehaviorSubject<ITrack>({});

	public $progress = new BehaviorSubject<number>(0);
	public $remaining = new BehaviorSubject<number>(0);
	public $duration = new BehaviorSubject<number>(0);
	public $playing = new BehaviorSubject<boolean>(false);

	public audio: HTMLAudioElement;

	public shuffle = getBoolean("shuffle", false);
	public repeat = getBoolean("repeat", false);
	public loop = getBoolean("loop", false);

	private _index: number;
	constructor(private httpService: HttpService) {
		this.audio = new Audio();
		this.audio.addEventListener("timeupdate", this.onProgress.bind(this));
		this.audio.addEventListener("ended", this.onAudioEnded.bind(this));
	}

	/**
	 * Return current track index in the playlist
	 */
	public get index() {
		return this._index || Math.abs(this.$queue.getValue().indexOf(this.$track.getValue()));
	}

	/**
	 * Get random track index for shuffle play
	 */
	public get randomIndex() {
		return Math.floor(Math.random() * this.$queue.getValue().length) + 0;
	}

	/**
	 * Check if track is last in queue
	 */
	public get isLast() {
		return this.$queue.getValue().indexOf(this.$track.getValue()) === (this.$queue.getValue().length - 1);
	}

	/**
	 * Play next track
	 */
	public onNext() {
		const index = this.shuffle ? this.randomIndex : (this.index + 1);
		if (this.$queue.getValue()[index]) {
			this.onPlay(this.$queue.getValue()[index]);
		}

		if (!this.shuffle && this.repeat && this.isLast) {
			this.onPlay(this.$queue.getValue()[0]);
		}
	}

	public onPrev() {
		const index = this.shuffle ? this.randomIndex : (this.index - 1);
		if (this.$queue.getValue()[index]) {
			this.onPlay(this.$queue.getValue()[index]);
		}
	}

	/**
	 * Play track
	 */
	public onPlay(...tracks: ITrack[]) {
		tracks = tracks.map((track) => {
			return {
				...track, ...{
					source: `${this.httpService.API_ENDPOINT}/tracks/play/${track._id}`,
				},
			};
		});

		// super ugly oneliner
		this.$queue.next(this.$queue.getValue().concat(tracks.filter((track) => !this.$queue.getValue().map((t) => t._id).includes(track._id))));

		this.$track.next(tracks[0]);

		this.audio.src = tracks[0].source;
		this.audio.play();
		this.$playing.next(true);

	}

	/**
	 * Toggle audio playback
	 */
	public onPlayback() {
		if (!this.audio.paused) {
			this.audio.pause();
			this.$playing.next(false);
		} else {
			this.audio.play();
			this.$playing.next(true);
		}
	}

	private onProgress() {
		this.$progress.next((this.audio.currentTime / this.audio.duration) * 100);
	}

	private onAudioEnded(event) {
		this.audio.pause();
		this.audio.currentTime = 0;
		this.onNext();
	}
}
