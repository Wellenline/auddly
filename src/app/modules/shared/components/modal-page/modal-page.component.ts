import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit } from "@angular/core";
import { SlideUpToggleAnimation } from "src/app/modules/shared/animation/slide-up";
import { PlatformLocation } from "@angular/common"

@Component({
	selector: "app-modal-page",
	templateUrl: "./modal-page.component.html",
	styleUrls: ["./modal-page.component.scss"],
	animations: [SlideUpToggleAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class ModalPageComponent implements OnInit {
	public visible = false;

	public $visible = new EventEmitter();
	public render = false;
	constructor(private changeDetector: ChangeDetectorRef, private location: PlatformLocation) { }

	ngOnInit(): void {
		this.location.onPopState(() => this.close());

	}

	public show() {
		this.visible = true;
		this.$visible.next(this.visible);
		this.changeDetector.detectChanges();
		history.pushState(null, "modalPageOpen");


	}

	public close() {
		this.visible = false;
		this.$visible.next(this.visible);

		this.changeDetector.detectChanges();

	}

	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(evt: KeyboardEvent) {
		this.close();
	}

}
