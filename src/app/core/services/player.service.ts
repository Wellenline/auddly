import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
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
	progress?: number;
	lyrics?: {
		text: string
	} | null;
	playlists?: { name?: string, _id?: number }[];
	name?: string;
	source?: string;
	liked?: boolean;
	waveform?: string;
}

@Injectable({
	providedIn: "root",
})
export class PlayerService {
	public $queue = new BehaviorSubject<ITrack[]>(JSON.parse(localStorage.getItem("queue")) || []);
	public $track = new BehaviorSubject<ITrack>(JSON.parse(localStorage.getItem("track")) || {});

	public $progress = new BehaviorSubject<number>(parseInt(localStorage.getItem("progress"), 10) || 0);
	public $buffer = new BehaviorSubject<number>(0);

	public $buffering = new BehaviorSubject<boolean>(false);

	public $volume = new BehaviorSubject<number>(parseFloat(localStorage.getItem("volume")) || 100);
	public $playing = new BehaviorSubject<boolean>(false);
	public $endless = new BehaviorSubject<boolean>(localStorage.getItem("endless") === "true");


	public audio: HTMLAudioElement;

	public shuffle = localStorage.getItem("shuffle") === "true";
	public repeat = localStorage.getItem("repeat") === "true";
	public loop = false;
	public $queueVisible = new BehaviorSubject<boolean>(localStorage.getItem("queue-visible") === "true");
	public ready = false;

	constructor(private httpService: HttpService, private title: Title) {
	}

	public setupAudio() {
		this.audio = new Audio();

		this.audio.addEventListener("timeupdate", this._onProgress.bind(this));
		this.audio.addEventListener("canplay", () => {
			console.log("Enough data to start playback");
		});
		this.audio.addEventListener("error", () => {
			console.log("Failed to load audio");
		});
		this.audio.addEventListener("loadeddata", () => {
			console.log("Loaded audio data");
			if (this.$progress.getValue()) {
				this.audio.currentTime = (this.$progress.getValue() * this.audio.duration) / 100;
			}
			// this.$buffering.next(this.audio.readyState >= 2);
		});
		this.audio.addEventListener("ended", this._onAudioEnded.bind(this));
		this.audio.volume = parseFloat(localStorage.getItem("volume")) || 1;
		if (this.$track.getValue()._id) {
			this.setupAudioPlayer(this.$track.getValue(), false);
		}

		navigator.mediaSession.setActionHandler("play", this.onPlayback.bind(this));
		navigator.mediaSession.setActionHandler("pause", this.onPlayback.bind(this));
		navigator.mediaSession.setActionHandler("previoustrack", this.onPrev.bind(this));
		navigator.mediaSession.setActionHandler("nexttrack", this.onNext.bind(this));
		navigator.mediaSession.setActionHandler("seekto", this.onSeek.bind(this));


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
 * Check if track is last in queue
 */
	public get isFirst() {
		return this.index === 0;
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

	public onToggleQueue() {
		this.$queueVisible.next(!this.$queueVisible.getValue());
		localStorage.setItem("queue-visible", this.$queueVisible.getValue().toString());
	}

	public onEndless() {
		this.$endless.next(!this.$endless.getValue());
		localStorage.setItem("endless", this.$endless.getValue().toString());
	}

	public onRepeat() {
		this.repeat = !this.repeat;
		localStorage.setItem("repeat", this.repeat.toString());
	}

	public onShuffle() {
		this.shuffle = !this.shuffle;
		localStorage.setItem("shuffle", this.shuffle.toString());
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
		const queue = this.$queue.getValue().concat(tracks.filter((track) => !this.$queue.getValue().map((t) => t._id).includes(track._id)));
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
		this.title.setTitle(`Auddly Music`);


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
		this.queue(tracks);

		this.$track.next(tracks[0]);
		this.$progress.next(0);

		this.$playing.next(true);
		localStorage.setItem("track", JSON.stringify(tracks[0]));
		this._onIncrement(this.$track.getValue());

		this.setupAudioPlayer(tracks[0]);


		if (this.isLast && this.$endless.getValue()) {
			this.getRandomTracks(5).subscribe((data: any) => this.queue(data));
		}

	}

	public setupAudioPlayer(track: ITrack, autoPlay: boolean = true) {
		this.audio.src = `${track.source}`;
		this.audio.crossOrigin = "anonymous";
		// this.audio.load();
		if (autoPlay) {
			this.audio.play();
			this.$playing.next(true);
		}

		this.title.setTitle(`${track.name} - ${track.artist}`);

		//if ("mediaSession" in navigator) {
		(navigator as any).mediaSession.setPositionState(null);
		(navigator as any).mediaSession.metadata = new MediaMetadata({
			title: track.name,
			artist: track.artist,
			album: track.album.name,
			artwork: [
				/*{ src: track.album.picture, sizes: "96x96", type: "image/png" },
				{ src: track.album.picture, sizes: "128x128", type: "image/png" },
				{ src: track.album.picture, sizes: "192x192", type: "image/png" },
				{ src: track.album.picture, sizes: "256x256", type: "image/png" },
				{ src: track.album.picture, sizes: "384x384", type: "image/png" },*/
				{ src: track.album.picture, type: "image/png" },
			],
		});


		//}

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
	public onSeek(time: number | {
		action: "seekto"
		fastSeek: boolean
		seekTime: number
	}) {
		console.log(time);

		if (typeof time === "number") {
			this.audio.currentTime = time * this.audio.duration;
		} else {
			this.audio.currentTime = time.seekTime;
		}
	}

	/**
	 * set audio player volume
	 * TODO save this in localstorage
	 * @param volume number
	 */
	public onVolume(volume: number) {
		this.audio.volume = volume;
		localStorage.setItem("volume", this.audio.volume.toString());
		this.$volume.next(volume);

	}

	public onLike(id: string) {
		return this.httpService.get(`/tracks/like/${id}`);
	}

	public getRandomTracks(count: number) {
		return this.httpService.get(`/tracks/random?total=${count}`);
	}

	private _onProgress() {
		this.$buffering.next(this.audio.buffered.length === 0);
		if (this.audio.duration > 0) {
			for (let index = 0; index < this.audio.buffered.length; index++) {
				if (this.audio.buffered.start(this.audio.buffered.length - 1 - index) < this.audio.currentTime) {
					this.$buffer.next((this.audio.buffered.end(this.audio.buffered.length - 1 - index) / this.audio.duration) * 100);
					break;
				}

			}
		}

		const progress = (this.audio.currentTime / this.audio.duration) * 100;
		if (!isNaN(progress)) {
			this.$progress.next(progress);
			localStorage.setItem("progress", progress.toString());

			if ("mediaSession" in navigator) {
				(navigator as any).mediaSession.setPositionState({
					duration: this.audio.duration,
					position: this.audio.currentTime,
				});
			}
		}


	}

	private _onAudioEnded() {
		this.audio.currentTime = 0;
		this.$playing.next(false);
		this.onNext();
	}

	private _onIncrement(track: ITrack) {
		this.httpService.put(`/tracks/plays/${track._id}`, {}).subscribe((response) => {
			console.log("Saved");
		});
	}
}