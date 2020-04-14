import { Component, OnInit } from "@angular/core";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "app-toast",
	template: `<div class="toast {{ toastService.visible ? 'show' : '' }}">{{ toastService.message }}</div>`,
	styleUrls: ["./toast.component.scss"],
})
export class ToastComponent implements OnInit {

	constructor(public toastService: ToastService) { }

	ngOnInit(): void {
	}

}
