import { Component, OnInit, Input } from "@angular/core";
import { ITrack, PlayerService } from "src/app/services/player.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "app-fav-button",
	templateUrl: "./fav-button.component.html",
	styleUrls: ["./fav-button.component.scss"],
})
export class FavButtonComponent implements OnInit {
	@Input() public track: ITrack;
	constructor(private playerService: PlayerService, private toastService: ToastService) { }

	ngOnInit(): void {
	}

	onLike(e) {
		e.stopPropagation();
		this.playerService.onLike(this.track._id).subscribe(() => {
			this.track.favourited = !this.track.favourited;
			this.toastService.show(`${this.track.name} ${this.track.favourited ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});
		});
	}
}
