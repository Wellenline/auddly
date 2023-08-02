import { Component, HostListener, OnInit } from "@angular/core";
import { PlayerService } from "src/app/core/services/player.service";
import { QueueComponent } from "src/app/overlays/queue/queue.component";
import { SearchComponent } from "src/app/overlays/search/search.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { SidebarService } from "src/app/standalone/sidebar/sidebar.service";

@Component({
	selector: "app-root",
	templateUrl: "./root.component.html",
	styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit {

	constructor(public playerService: PlayerService, private modalService: ModalService, private s: SidebarService) { }

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
		this.s.show({
			component: QueueComponent,
		})
	}

	ngAfterViewInit() {
		this.playerService.setupAudio();

	}
}