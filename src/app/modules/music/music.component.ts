import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { DetailsComponent } from "../settings/pages/details/details.component";
import { SettingsComponent } from "../settings/settings.component";

@Component({
	selector: "app-music",
	templateUrl: "./music.component.html",
	styleUrls: ["./music.component.scss"]
})
export class MusicComponent implements OnInit {

	constructor(public modalService: ModalService) { }

	ngOnInit(): void {
	}

	openSettings() {
		this.modalService.show({
			component: DetailsComponent,

		})
	}

}
