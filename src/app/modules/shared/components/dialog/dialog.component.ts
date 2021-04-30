import { Component, HostListener, OnInit } from '@angular/core';
import { InterfaceService } from '../../services/interface.service';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
	public visible = false;
	public prompt: string;
	constructor(public interfaceService: InterfaceService) { }

	ngOnInit(): void {
	}
	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(evt: KeyboardEvent) {
		this.close(false);
	}

	public close(status: boolean | string) {
		this.interfaceService.dialog.close(status);
		this.prompt = "";

	}
}
