import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";

@Component({
	selector: "app-playlist",
	templateUrl: "./playlist.component.html",
	styleUrls: ["./playlist.component.scss"]
})
export class PlaylistComponent implements OnInit {

	public invites: any = [{}];

	public loading = false;

	public error: string;
	public roles = [];
	constructor(public modalComponent: ModalComponent) { }


	ngOnInit(): void {
		this.getRoles();
	}

	getRoles() {

	}

	onAdd() {
		this.invites.push({});
	}

	onRemoveInvite(index) {
		this.invites.splice(index, 1);
	}

	onSend() {
		// todo


	}

	onClose() {
		// reset invites
		this.modalComponent.onClose();


	}


}
