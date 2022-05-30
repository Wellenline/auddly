import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { debounce } from "src/app/utils";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { AlbumComponent } from "../album/album.component";
import { ArtistComponent } from "../artist/artist.component";
import { PlaylistComponent } from "../playlist/playlist.component";
import { HttpService } from "src/app/core/services/http.service";
import { PlayerService } from "src/app/core/services/player.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
	public result = {
		albums: [],
		tracks: [],
		artists: [],
	};

	public search: string;

	public loading = {
		albums: true,
		artists: true,
		tracks: true,
	};
	@ViewChild("searchInput") searchInput: ElementRef;
	constructor(private httpService: HttpService, private modalService: ModalService, public modal: ModalComponent, private playerService: PlayerService, private router: Router, private route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			if (params.q) {
				this.search = params.q;
				this.getSearchResults(params.q);
			}

		});


	}
	public onArtist(id: string) {
		this.modalService.show({
			component: ArtistComponent,
			class: "fullscreen",
			params: {
				id,
			}
		});
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

	public onPlayTracks() {
		if (this.result.tracks.length > 0) {
			this.playerService.onPlay(...this.result.tracks);
		}
	}

	@debounce(300)
	public onSearch(e) {
		const search = e.target.value && e.target.value.length >= 3 ? e.target.value : "";
		this.getSearchResults(search);
	}

	public getSearchResults(search) {
		if (search.length < 3) {
			return;
		}
		this.loading = {
			artists: true,
			albums: true,
			tracks: true,
		};
		this.httpService.get(`/search?q=${search}`).subscribe((response: any) => {
			console.log(response);
			this.result = response;
		}, (err) => {
			console.log(err);
		}).add(() => {
			this.loading = {
				artists: false,
				albums: false,
				tracks: false,
			};
		});
	}

	ngAfterViewInit() {

		this.searchInput.nativeElement.focus();
	}
}
