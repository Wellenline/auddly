import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from 'src/app/core/services/music.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { AlbumComponent } from '../../components/album/album.component';

@Component({
	selector: 'app-albums',
	templateUrl: './albums.component.html',
	styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
	public albums = [];
	public pagination = {
		skip: 0,
		limit: 20,
		total: 0,
	};
	constructor(private musicService: MusicService, private router: Router, private route: ActivatedRoute, private modalService: ModalService) { }

	ngOnInit(): void {
		this.getAlbums();
		this.musicService.albums.subscribe((albums) => {
			this.albums = albums;
		});

		this.route.queryParams.subscribe((params) => {
			if (params.album) {
				this.onAlbum(params.album);
			}
		});
	}

	public onAlbum(id: string) {
		this.modalService.show({
			component: AlbumComponent,
			class: "fullscreen",
			params: {
				id,
			},
			callback: () => {
				this.router.navigate([], {
					queryParams: {
						'album': null,
					},
					queryParamsHandling: 'merge'
				});
			}
		});
	}

	public getAlbums() {
		console.log("loading albums");
		this.musicService.getAlbums(this.pagination).subscribe((response: { total: number, albums: [] }) => {
			this.albums = this.albums.concat(response.albums);
			this.pagination.total = response.total;
			if (this.pagination.total) {
				this.pagination.total = response.total;
			}
		});
	}

	public onScroll() {
		if (this.albums.length !== this.pagination.total) {
			this.pagination.skip += this.pagination.limit;
			this.getAlbums();
		}

	}



}
