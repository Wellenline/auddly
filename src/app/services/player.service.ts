import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { InterfaceService } from "../modules/shared/services/interface.service";
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

	public audio: HTMLAudioElement;

	public shuffle = localStorage.getItem("shuffle") === "true";
	public repeat = localStorage.getItem("repeat") === "true";
	public loop = false;

	constructor(private httpService: HttpService, private interfaceService: InterfaceService) {
		this.audio = new Audio();

		this.audio.addEventListener("timeupdate", this.onProgress.bind(this));
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
		this.audio.addEventListener("ended", this.onAudioEnded.bind(this));
		this.audio.volume = parseFloat(localStorage.getItem("volume")) || 1;
		if ("mediaSession" in navigator) {
			(navigator as any).mediaSession.setActionHandler("play", this.onPlayback.bind(this));
			(navigator as any).mediaSession.setActionHandler("pause", this.onPlayback.bind(this));
			(navigator as any).mediaSession.setActionHandler("previoustrack", this.onPrev.bind(this));
			(navigator as any).mediaSession.setActionHandler("nexttrack", this.onNext.bind(this));
			(navigator as any).mediaSession.setActionHandler("seekto", this.onSeek.bind(this));
		}
		if (this.$track.getValue()._id) {
			this.setupAudioPlayer(this.$track.getValue(), false);

		}
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
		this.setupAudioPlayer(tracks[0]);
		localStorage.setItem("track", JSON.stringify(tracks[0]));


	}

	public setupAudioPlayer(track: ITrack, autoPlay: boolean = true) {
		this.audio.src = track.source;
		this.audio.crossOrigin = "anonymous";
		// this.audio.load();
		if (autoPlay) {
			this.audio.play();
			this.$playing.next(true);
		}


		if ("mediaSession" in navigator) {
			(navigator as any).mediaSession.setPositionState(null);
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

	public onAddToPlaylist(track: ITrack) {
		console.log(track.playlists);
		this.httpService.get(`/playlists`).subscribe((response: { playlists: [{ name: any, _id: number }] }) => {
			this.interfaceService.dialog.show({
				items: response.playlists.map((playlist) => playlist.name),
				type: "picker",
				title: "Playlist",
				message: "Choose the playlist you wish to add the track",
				closed: (index) => {
					if (index !== false && index !== undefined) {
						const playlist = response.playlists[index];
						if (!track.playlists) {
							track.playlists = [];
						}
						if (!track.playlists || track.playlists.findIndex((p) => p._id === playlist._id) === -1) {
							this._addToPlaylist(track, playlist);
						}
					}
				},
			});
		});
	}

	public onRemoveFromPlaylist(track: ITrack) {
		this.interfaceService.dialog.show({
			items: track.playlists.map((playlist) => playlist.name),
			type: "picker",
			title: "Playlist",
			message: "Choose the playlist you wish to remove the track from",
			closed: (index) => {
				console.log(index);
				if (index !== false && index !== undefined) {
					const playlist = track.playlists[index];
					this._removeFromPlaylist(track, playlist, index);

				}
			},
		});
	}


	private _addToPlaylist(track, playlist) {
		this.httpService.post(`/playlists/${playlist._id}`, {
			track: track._id,
		}).subscribe((response) => {
			this.interfaceService.notify(`${track.name} added to ${playlist.name}`);
			track.playlists.push(playlist);
		});
	}

	private _removeFromPlaylist(track, playlist, index) {
		this.httpService.delete(`/playlists/${playlist._id}/${track._id}`).subscribe((response) => {
			this.interfaceService.notify(`${track.name} removed from ${playlist.name}`);
			if (index > -1) {
				track.playlists.splice(index, 1);
			}
			// this.reload.emit(true);
		});
	}

	private onProgress() {
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

	private onAudioEnded() {
		this.audio.currentTime = 0;
		this.$playing.next(false);
		this.onNext();
	}
}
