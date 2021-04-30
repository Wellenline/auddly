import { Component, OnInit, Output, EventEmitter, Input, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
	@Input() public visible = false;
	@Input() public fluid = false;

	@Output() public visibleChange = new EventEmitter();
	constructor(private route: ActivatedRoute, private router: Router) { }

	public ngOnInit() {
		// ok
	}

	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(evt: KeyboardEvent) {
		this.close();
	}

	public close() {
		// this.visible = false;
		this.visibleChange.emit(false);
		setTimeout(() => {
			this.router.navigate(
				["."],
				{ relativeTo: this.route, queryParams: {} },
			);
		}, 300);


	}
}
