import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
	public tab = 0;

	public artists = [];
	public albums = [];
	public pagination = {
		total: 0,
		skip: 0,
		limit: 50,
	};
	public loading = true;
	public height = 0;
	constructor(private httpService: HttpService) { }

	public onScroll(e?) {
		if (this.tab === 0) {
			if (this.artists.length !== this.pagination.total) {
				this.pagination.skip += this.pagination.limit;

				this.fetchArtists();
			}
		} else {
			if (this.albums.length !== this.pagination.total) {
				this.pagination.skip += this.pagination.limit;
				this.fetchAlbums();
			}
		}


	}

	public ngOnInit(): void {
		this.fetchArtists();
	}

	public fetchArtists() {
		this.loading = true;
		this.httpService.get(`/artists?skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.artists = this.artists.concat(response.artists);
			this.pagination.total = response.total;
			this.loading = false;
		});
	}

	private fetchAlbums() {
		this.loading = true;
		this.httpService.get(`/albums?skip=${this.pagination.skip}&limit=${this.pagination.limit}`).subscribe((response: any) => {
			this.albums = this.albums.concat(response.albums);
			this.pagination.total = response.total;
			this.loading = false;
		}, (err) => {
			console.log(err);
		});
	}

	setTab(index: number) {
		this.pagination = {
			total: 0,
			skip: 0,
			limit: 100,
		};
		this.tab = index;

		setTimeout(() => {
			if (index === 0) {
				this.fetchArtists();
				// this.onShowFollowers();
			} else {
				this.fetchAlbums();

				// this.onShowFollowing();
			}
		}, 100);

	}

	public ngAfterViewInit() {
		this.height = document.getElementsByClassName("app-content")[0].clientHeight;
	}

}
