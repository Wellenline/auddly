import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { getBoolean } from "../utils";
import { HttpService } from "./http.service";

export interface ITrack {
	id?: string;
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
	liked?: boolean;
}

@Injectable({
	providedIn: "root",
})
export class PlayerService {
	public $queue = new BehaviorSubject<ITrack[]>(JSON.parse(localStorage.getItem("queue")) || []);
	public $track = new BehaviorSubject<ITrack>(JSON.parse(localStorage.getItem("track")) || {});

	public $progress = new BehaviorSubject<number>(0);
	public $volume = new BehaviorSubject<number>(100);
	public $playing = new BehaviorSubject<boolean>(false);

	public audio: HTMLAudioElement;

	public shuffle = false;
	public repeat = false;
	public loop = false;

	constructor(private httpService: HttpService) {
		this.audio = new Audio();
		this.audio.addEventListener("timeupdate", this.onProgress.bind(this));
		this.audio.addEventListener("ended", this.onAudioEnded.bind(this));

		(navigator as any).mediaSession.setActionHandler("play", this.onPlayback.bind(this));
		(navigator as any).mediaSession.setActionHandler("pause", this.onPlayback.bind(this));
		(navigator as any).mediaSession.setActionHandler("previoustrack", this.onPrev.bind(this));
		(navigator as any).mediaSession.setActionHandler("nexttrack", this.onNext.bind(this));

		if (this.$track.getValue().id) {
			this.setupAudioPlayer(this.$track.getValue(), false);

		}
	}

	/**
	 * Return current track index in the playlist
	 */
	public get index() {
		return Math.abs(this.$queue.getValue().findIndex((t) => t.id === this.$track.getValue().id));
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
	 * Add tracks to queue
	 * @param tracks tracks
	 */
	public queue(tracks: ITrack[]) {
		const queue = this.$queue.getValue().concat(tracks.filter((track) => !this.$queue.getValue().map((t) => t.id).includes(track.id)));
		localStorage.setItem("queue", JSON.stringify(queue));

		this.$queue.next(queue);
	}

	/**
	 * Clear localstorage
	 */
	public clear() {
		localStorage.setItem("queue", JSON.stringify([]));
		localStorage.setItem("track", JSON.stringify({}));
		this.$queue.next([]);
		this.$track.next({});
		this.audio.src = undefined;
		this.$playing.next(false);
		this.$progress.next(0);

	}

	/**
	 * Play track
	 */
	public onPlay(...tracks: ITrack[]) {
		tracks = tracks.map((track) => {
			return {
				...track, ...{
					source: `${this.httpService.API_ENDPOINT}/tracks/play/${track.id}`,
				},
			};
		});

		// super ugly oneliner
		this.queue(tracks);

		localStorage.setItem("track", JSON.stringify(tracks[0]));
		this.$track.next(tracks[0]);
		this.$progress.next(0);
		this.$playing.next(true);
		this.setupAudioPlayer(tracks[0]);


	}

	public setupAudioPlayer(track: ITrack, autoPlay: boolean = true) {
		this.audio.src = track.source;
		this.audio.crossOrigin = "anonymous";
		this.audio.load();
		if (autoPlay) {
			this.audio.play();
			this.$playing.next(true);
		}

		if ("mediaSession" in navigator) {
			// @ts-ignore
			(navigator as any).mediaSession.metadata = new MediaMetadata({
				title: track.name,
				artist: track.artist,
				album: track.album.name,
				artwork: [
					{ src: track.album.picture, sizes: "96x96", type: "image/png" },
					{ src: track.album.picture, sizes: "128x128", type: "image/png" },
					{ src: track.album.picture, sizes: "192x192", type: "image/png" },
					{ src: track.album.picture, sizes: "256x256", type: "image/png" },
					{ src: track.album.picture, sizes: "384x384", type: "image/png" },
					{ src: track.album.picture, sizes: "512x512", type: "image/png" },
					{ src: track.album.picture, sizes: "512x512", type: "image/png" },

				],
			});


		}

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

	private onAudioEnded() {
		this.audio.currentTime = 0;
		this.$playing.next(false);
		this.onNext();
	}
}
