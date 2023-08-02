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
import { SlideRight } from "src/app/animations/slide";
import { SidebarService } from "src/app/standalone/sidebar/sidebar.service";
import { SidebarComponent } from "src/app/standalone/sidebar/sidebar.component";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.scss"],
	animations: [SlideRight]

})
export class SearchComponent implements OnInit {
	public result = {
		albums: [],
		tracks: [],
		artists: [],
	};

	public search: string;

	public loading = false;
	public full = false;
	@ViewChild("searchInput") searchInput: ElementRef;
	constructor(private httpService: HttpService, private modalService: SidebarService, public modal: SidebarComponent, private playerService: PlayerService) { }

	public ngOnInit(): void {
		if (this.modal.params.q) {
			this.search = this.modal.params.q;
			this.getSearchResults(this.modal.params.q);
		}
	}
	public toggleSize() {
		this.full = !this.full;

		if (this.full) {
			this.modal.ref.addPanelClass("fullscreen");
		} else {
			this.modal.ref.removePanelClass("fullscreen");
		}
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
		this.loading = true;
		this.httpService.get(`/search?q=${search}`).subscribe((response: any) => {
			this.result = response;
		}, (err) => {
			console.log(err);
		}).add(() => {
			setTimeout(() => {
				this.loading = false;

			}, 500);
		});
	}

	ngAfterViewInit() {
		this.searchInput.nativeElement.focus();
	}
}
