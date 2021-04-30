import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ActivatedRoute } from "@angular/router";
import { SwiperOptions } from "swiper";

@Component({
	selector: "app-artist",
	templateUrl: "./artist.component.html",
	styleUrls: ["./artist.component.scss"],
})
export class ArtistComponent implements OnInit {
	public artist: any = {};
	public albums = [];
	public tracks = [];
	public config: SwiperOptions = {
		slidesOffsetBefore: 20,
		slidesOffsetAfter: 20,
		navigation: false,
		pagination: false,
		breakpoints: {
			0: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			// when window width is >= 320px
			320: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			// when window width is >= 640px
			640: {
				slidesPerView: 4,
				spaceBetween: 40
			},
			1024: {
				slidesPerView: 6,
				spaceBetween: 40
			},
			1448: {
				slidesPerView: 8,
				spaceBetween: 40
			}
		},
	};
	constructor(private httpService: HttpService, private route: ActivatedRoute) { }

	public ngOnInit(): void {

		this.route.params.subscribe((params) => {
			this.getArtist(params.id);
			this.getAlbums(params.id);
			this.getPopular(params.id);
		});

	}

	public getArtist(id: string) {
		this.httpService.get(`/artists/${id}`).subscribe((response: any) => {
			this.artist = response;
			// this.getArtistMetadata();
		});
	}

	public getArtistMetadata() {
		// tslint:disable-next-line:max-line-length
		this.httpService.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.artist.name}&api_key=57ee3318536b23ee81d6b27e36997cde&format=json`, true).subscribe((response: any) => {
			this.artist.bio = response.artist.bio.summary;
			this.artist.tags = response.artist.tags.tag;
		});
	}

	public getAlbums(id: string) {
		this.httpService.get(`/albums?artist=${id}`).subscribe((response: any) => {
			this.albums = response.albums;
		});
	}

	public getPopular(id: string) {
		this.httpService.get(`/tracks?popular=true&artist=${id}`).subscribe((response: any) => {
			this.tracks = response.tracks;
		});
	}

}
