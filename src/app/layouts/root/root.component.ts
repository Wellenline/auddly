import { Component, OnInit } from "@angular/core";
import { PlayerService } from "src/app/core/services/player.service";

@Component({
	selector: "app-root",
	templateUrl: "./root.component.html",
	styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit {

	constructor(public playerService: PlayerService) { }

	ngOnInit(): void {
	}

}
