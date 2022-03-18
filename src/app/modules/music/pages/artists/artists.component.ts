import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MusicService } from "src/app/core/services/music.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ArtistComponent } from "../../components/artist/artist.component";

@Component({
	selector: "app-artists",
	templateUrl: "./artists.component.html",
	styleUrls: ["./artists.component.scss"]
})
export class ArtistsComponent implements OnInit {
	public artists = [];
	public pagination = {
		skip: 0,
		limit: 20,
		total: 0,
	};
	constructor(private musicService: MusicService, private router: Router, private route: ActivatedRoute, private modalService: ModalService) { }

	ngOnInit(): void {
		this.getArtists();
	}

	public onArtist(id: string) {
		this.modalService.show({
			component: ArtistComponent,
			class: "fullscreen",
			params: {
				id
			},
		});
	}
	public getArtists() {
		console.log("loading albums");
		this.musicService.getArtists(this.pagination).subscribe((response: { total: number, artists: [] }) => {
			this.artists = this.artists.concat(response.artists);
			this.pagination.total = response.total;
			if (this.pagination.total) {
				this.pagination.total = response.total;
			}
		});
	}

	public onScroll() {
		if (this.artists.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			this.getArtists();
		}

	}

}
