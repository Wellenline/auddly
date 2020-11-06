import { Component, OnInit, Input } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "app-track-list",
	templateUrl: "./track-list.component.html",
	styleUrls: ["./track-list.component.scss"],
})
export class TrackListComponent implements OnInit {
	@Input() public track: ITrack = {};
	constructor(public playerService: PlayerService, private toastService: ToastService) { }

	public ngOnInit(): void {
	}

	public onPlay(e) {
		e.preventDefault();
		e.stopPropagation();
		console.log(JSON.stringify(this.track))
		this.playerService.onPlay(this.track);
	}

}
