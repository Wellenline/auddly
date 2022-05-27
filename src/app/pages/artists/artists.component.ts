import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { MusicService } from "src/app/core/services/music.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { ArtistComponent } from "../../overlays/artist/artist.component";

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
	public scrollCallback;
	public grid = true;
	constructor(private musicService: MusicService, private router: Router, private route: ActivatedRoute, private modalService: ModalService) { }

	ngOnInit(): void {
		this.getAlbums().subscribe();
		this.scrollCallback = this.onScroll.bind(this);
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

	public getAlbums() {
		return this.musicService.getArtists({
			skip: this.pagination.skip,
			limit: this.pagination.limit,
		}).pipe(
			map((res: any) => {
				this.artists = this.artists.concat(res.data);
				this.pagination.total = res.total;
				if (this.pagination.total) {
					this.pagination.total = res.total;
				}
			}));

		// });
	}

	public onScroll() {
		console.log("onScroll(), triggered");
		if (this.artists.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			return this.getAlbums();
		}

	}

}
