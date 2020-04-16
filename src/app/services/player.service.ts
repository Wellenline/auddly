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
	lossless?: boolean;
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
	public $volume = new BehaviorSubject<number>(100);
	public $remaining = new BehaviorSubject<number>(0);
	public $duration = new BehaviorSubject<number>(0);
	public $playing = new BehaviorSubject<boolean>(false);

	public audio: HTMLAudioElement;

	public shuffle = false;
	public repeat = false;
	public loop = false;

	constructor(private httpService: HttpService) {
		this.audio = new Audio();
		this.audio.addEventListener("timeupdate", this.onProgress.bind(this));
		this.audio.addEventListener("ended", this.onAudioEnded.bind(this));

	}

	/**
	 * Return current track index in the playlist
	 */
	public get index() {
		return Math.abs(this.$queue.getValue().findIndex((t) => t._id === this.$track.getValue()._id));
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
		return (this.index + 1) === this.$queue.getValue().length;
	}

	/**
	 * Play next track
	 */
	public onNext() {
		console.log(this.index);
		const index = this.shuffle ? this.randomIndex : (this.index + 1);
		console.log(index, this.isLast);
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
		this.audio.crossOrigin = "anonymous";
		this.audio.load();
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

	/**
	 * Seek audio to specific position
	 * @param time number
	 */
	public onSeek(time: number) {
		this.audio.currentTime = time * this.audio.duration;
	}

	/**
	 * set audio player volume
	 * TODO save this in localstorage
	 * @param volume number
	 */
	public onVolume(volume: number) {
		this.audio.volume = volume;
	}

	public onLike(id: string) {
		return this.httpService.get(`/tracks/like/${id}`);
	}

	private onProgress() {
		this.$progress.next((this.audio.currentTime / this.audio.duration) * 100);
	}

	private onAudioEnded(event) {
		this.audio.currentTime = 0;
		this.$playing.next(false);
		this.onNext();
	}
}
