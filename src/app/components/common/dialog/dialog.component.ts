import { Component, OnInit, HostListener } from "@angular/core";
import { DialogService } from "src/app/services/dialog.service";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
	constructor(public dialogService: DialogService) { }

	public ngOnInit() {
		// ok
	}

	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(evt: KeyboardEvent) {
		this.close(false);
	}

	public close(status: boolean) {
		this.dialogService.close(status);
	}

}
