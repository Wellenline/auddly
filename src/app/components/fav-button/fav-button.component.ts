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
		this.playerService.onLike(this.track.id).subscribe(() => {
			this.track.liked = !this.track.liked;
			this.toastService.show(`${this.track.name} ${this.track.liked ? "added to favourites" : "removed from favourites"}`, {
				timeout: 3000,
			});
		});
	}
}
