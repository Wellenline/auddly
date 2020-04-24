import { Component, OnInit, Input } from "@angular/core";
import { ITrack } from "src/app/services/player.service";

@Component({
	selector: "app-track-options",
	templateUrl: "./track-options.component.html",
	styleUrls: ["./track-options.component.scss"],
})
export class TrackOptionsComponent implements OnInit {
	@Input() public track: ITrack;
	constructor() { }

	ngOnInit(): void {
	}

}
