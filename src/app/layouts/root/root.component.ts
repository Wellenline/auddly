import { Component, HostListener, OnInit } from "@angular/core";
import { PlayerService } from "src/app/core/services/player.service";
import { SearchComponent } from "src/app/overlays/search/search.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";

@Component({
	selector: "app-root",
	templateUrl: "./root.component.html",
	styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit {

	constructor(public playerService: PlayerService, private modalService: ModalService) { }

	ngOnInit(): void {

	}

	@HostListener("document:keydown.meta.k")
	public onSearch() {
		this.modalService.show({
			component: SearchComponent,
		});
	}

	@HostListener("document:keydown.meta.i")
	public onQueue() {
		this.playerService.onToggleQueue();
	}

	ngAfterViewInit() {
		this.playerService.setupAudio();

	}
}