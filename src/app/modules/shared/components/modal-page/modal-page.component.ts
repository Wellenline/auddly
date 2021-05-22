import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { SlideUpToggleAnimation } from "src/app/modules/shared/animation/slide-up";
import { PlatformLocation } from "@angular/common"

@Component({
	selector: "app-modal-page",
	templateUrl: "./modal-page.component.html",
	styleUrls: ["./modal-page.component.scss"],
	animations: [SlideUpToggleAnimation],
	// changeDetection: ChangeDetectionStrategy.OnPush

})
export class ModalPageComponent implements OnInit {
	public visible = false;
	constructor(private changeDetector: ChangeDetectorRef, private location: PlatformLocation) { }

	ngOnInit(): void {
		this.location.onPopState(() => this.close());

	}

	public show() {
		this.visible = true;
		// this.changeDetector.detectChanges();
		history.pushState(null, "modalPageOpen");

		setTimeout(() => {
			document.body.style.position = "fixed";
			document.body.style.top = `-${window.scrollY}px`;
		}, 300);


	}

	public close() {
		this.visible = false;
		// this.changeDetector.detectChanges();

		const scrollY = document.body.style.top;
		document.body.style.position = "";
		document.body.style.top = "";
		window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);

	}

	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(evt: KeyboardEvent) {
		this.close();
	}

}
