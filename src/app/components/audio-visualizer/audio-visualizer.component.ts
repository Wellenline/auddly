import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-audio-visualizer",
	templateUrl: "./audio-visualizer.component.html",
	styleUrls: ["./audio-visualizer.component.scss"],
})
export class AudioVisualizerComponent implements OnInit {
	@Output() close = new EventEmitter();

	constructor(private playerService: PlayerService) { }

	ngOnInit(): void {

		const context = new AudioContext();
		const src = context.createMediaElementSource(this.playerService.audio);
		const analyser = context.createAnalyser();

		const canvas: any = document.getElementById("canvas");
		canvas.width = 300;
		canvas.height = 300;
		const ctx = canvas.getContext("2d");

		src.connect(analyser);
		analyser.connect(context.destination);

		analyser.fftSize = 256;

		const bufferLength = analyser.frequencyBinCount;
		console.log(bufferLength);

		const dataArray = new Uint8Array(bufferLength);

		const WIDTH = canvas.width;
		const HEIGHT = canvas.height;

		const barWidth = (WIDTH / bufferLength) * 2.5;
		let barHeight;
		let x = 0;

		const renderFrame = () => {
			requestAnimationFrame(renderFrame);

			x = 0;

			analyser.getByteFrequencyData(dataArray);

			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);

			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];

				const r = barHeight + (25 * (i / bufferLength));
				const g = 250 * (i / bufferLength);
				const b = 50;

				ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
				ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

				x += barWidth + 1;
			}
		};

		renderFrame();

	}

	public onClose() {
		console.log("CLOSING");
		this.close.emit(false);
	}

}
