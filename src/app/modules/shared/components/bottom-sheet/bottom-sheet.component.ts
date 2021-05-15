import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
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
	@Input() options: BottomSheetConfig;

	constructor(private changeDetector: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.flags.isCloseButtonEnabled = this.options.enableCloseButton ? true : false;
		this.options.closeButtonTitle = this.options.closeButtonTitle ? this.options.closeButtonTitle : "Close";
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

}
