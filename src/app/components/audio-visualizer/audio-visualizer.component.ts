import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PlayerService, ITrack } from "src/app/services/player.service";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-audio-visualizer",
	templateUrl: "./audio-visualizer.component.html",
	styleUrls: ["./audio-visualizer.component.scss"],
})
export class AudioVisualizerComponent implements OnInit {
	@Output() close = new EventEmitter();
	public track: ITrack = {};
	public progress = 0;
	public playing = false;
	public currentTime = 0;
	constructor(public playerService: PlayerService) { }

	ngOnInit(): void {
		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});

		const context = new AudioContext();
		const src = context.createMediaElementSource(this.playerService.audio);
		const analyser = context.createAnalyser();

		const canvas: any = document.getElementById("canvas");
		canvas.width = window.innerWidth;
		canvas.height = 300;

		const ctx = canvas.getContext("2d");

		src.connect(analyser);
		analyser.connect(context.destination);
		analyser.fftSize = 256;

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		const WIDTH = canvas.width;
		const HEIGHT = canvas.height;

		const barWidth = (WIDTH / bufferLength) * 1.5;
		let barHeight: number;
		let x = 0;

		// tslint:disable-next-line:space-before-function-paren
		(CanvasRenderingContext2D as any).prototype.roundRect = function (rx: any, ry: any, width: any, height: any, radius: any) {
			const rectX = rx;
			const rectY = ry;
			const rectWidth = width;
			const rectHeight = height;
			const cornerRadius = radius;

			this.lineJoin = "round";
			this.lineWidth = cornerRadius;
			this.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
			this.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
			this.stroke();
			this.fill();
		};

		const renderFrame = () => {
			requestAnimationFrame(renderFrame);

			x = 0;

			analyser.getByteFrequencyData(dataArray);

			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);

			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];

				ctx.fillStyle = "#4CAF50";
				ctx.strokeStyle = "#4CAF50";
				ctx.roundRect(x, HEIGHT - barHeight, barWidth, barHeight, 10);

				x += barWidth + 1;
			}
		};

		renderFrame();

		this.playerService.$playing.subscribe((playing) => {
			this.playing = playing;
		});

		this.playerService.$progress.subscribe((num) => {
			this.progress = num;
			this.currentTime = this.playerService.audio.currentTime;
		});

		this.playerService.$track.subscribe((track) => {
			this.track = track;
		});
	}

	public onProgress(e) {
		this.playerService.onSeek((e.pageX - e.srcElement.offsetLeft) / e.currentTarget.clientWidth);
	}

	public onLike() {
		this.playerService.onLike(this.track._id).subscribe(() => {
			this.track.favourited = !this.track.favourited;
		});

	}

	public onClose() {
		this.close.emit(false);
	}

}
