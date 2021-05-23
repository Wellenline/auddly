import { NgForOfContext } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, OnInit, TemplateRef } from "@angular/core";
import { SlideUpToggleAnimation } from "../../animation/slide-up";
import { BottomSheetConfig } from "../../interfaces/bottom-sheet";

@Component({
	selector: "app-bottom-sheet",
	templateUrl: "./bottom-sheet.component.html",
	styleUrls: ["./bottom-sheet.component.scss"],
	animations: [SlideUpToggleAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetComponent implements OnInit {

	public flags: any = {
		isBottomSheetEnabled: false
	};
	@Input() options: BottomSheetConfig = {
		maxHeight: "400"
	};

	@Input() public header: TemplateRef<any>;

	@ContentChild(TemplateRef) public headerRef: TemplateRef<any>;


	constructor(private changeDetector: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.flags.isCloseButtonEnabled = this.options.enableCloseButton ? true : false;
		this.options.closeButtonTitle = this.options.closeButtonTitle ? this.options.closeButtonTitle : "Close";

		this.options.maxHeight = this.options.maxHeight ? this.options.maxHeight : "400";

		if (this.header) {
			this.headerRef = this.header;
		}
	}

	/**
	 * Opens bottom sheet component
	 */
	open() {
		this.flags.isBottomSheetEnabled = true;
		this.changeDetector.detectChanges();
	}

	/**
	 * Closes bottom sheet component
	 */
	close() {
		this.flags.isBottomSheetEnabled = false;
		this.changeDetector.detectChanges();
	}

	/**
	 * Toggles bottom sheet component
	 */
	toggle() {
		this.flags.isBottomSheetEnabled = !this.flags.isBottomSheetEnabled;
		this.changeDetector.detectChanges();
	}

	/**
	 * Toggles close button
	 */
	toggleCloseButton() {
		this.flags.isCloseButtonEnabled = !this.flags.isCloseButtonEnabled;
		this.changeDetector.detectChanges();
	}

	onPan(e) {
		console.log(e);
	}

}
