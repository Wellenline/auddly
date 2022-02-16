import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { MusicService } from "src/app/core/services/music.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { AlbumComponent } from "../../components/album/album.component";

@Component({
	selector: "app-albums",
	templateUrl: "./albums.component.html",
	styleUrls: ["./albums.component.scss"]
})
export class AlbumsComponent implements OnInit {
	public albums = [];
	public pagination = {
		skip: 0,
		limit: 50,
		total: 0,
	};
	public grid = true;
	public sort = "-created_at";
	public scrollCallback;
	constructor(private musicService: MusicService, private router: Router, private route: ActivatedRoute, private modalService: ModalService) { }

	ngOnInit(): void {
		this.getAlbums().subscribe();
		this.scrollCallback = this.onScroll.bind(this);
	}

	public onSort(key: string) {
		this.sort = this.sort.includes(key) ? this.sort.startsWith("-") ? this.sort.replace("-", "") : `-${key}` : key;

		this.pagination = {
			total: 0,
			skip: 0,
			limit: 50,
		};

		this.albums = [];
		this.getAlbums().subscribe();
	}

	public onAlbum(id: string) {
		this.modalService.show({
			component: AlbumComponent,
			class: "fullscreen",
			params: {
				id,
			}
		});
	}

	public getAlbums() {
		return this.musicService.getAlbums({
			skip: this.pagination.skip,
			limit: this.pagination.limit,
			sort: this.sort,
		}).pipe(
			map((res: any) => {
				this.albums = this.albums.concat(res.albums);
				this.pagination.total = res.total;
				if (this.pagination.total) {
					this.pagination.total = res.total;
				}
			}));

		// });
	}

	public onScroll() {
		console.log("onScroll(), triggered");
		if (this.albums.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			return this.getAlbums();
		}

	}



}
