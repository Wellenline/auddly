import { Component, OnInit, HostListener } from "@angular/core";
import { DialogService } from "src/app/services/dialog.service";
import { InterfaceService } from "../../services/interface.service";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
	public visible = false;
	public prompt: string;
	constructor(public interfaceService: InterfaceService) { }

	public ngOnInit() {
		// ok
	}

	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(evt: KeyboardEvent) {
		this.close(false);
	}

	public close(status: boolean | string) {
		if (this.prompt) {
			status = this.prompt;
		}

		this.interfaceService.dialog.close(status);
	}
}