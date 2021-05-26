import { NgForOfContext } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { SlideUpToggleAnimation } from "../../animation/slide-up";
import { BottomSheetConfig } from "../../interfaces/bottom-sheet";

@Component({
	selector: "app-bottom-sheet",
	templateUrl: "./bottom-sheet.component.html",
	styleUrls: ["./bottom-sheet.component.scss"],
	animations: [SlideUpToggleAnimation],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetComponent implements OnInit {

	@Input() options: BottomSheetConfig = {
		maxHeight: "400"
	};

	@Input() public header: TemplateRef<any>;

	@ContentChild(TemplateRef) public headerRef: TemplateRef<any>;

	public moving = false;
	public deltaY = 0;
	public _visible = false;

	@ViewChild("bottomSheetContainer") bottomSheetContainer: ElementRef;

	constructor(private changeDetector: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.options.maxHeight = this.options.maxHeight ? this.options.maxHeight : "400";

		if (this.header) {
			this.headerRef = this.header;
		}
	}

	/**
	 * Opens bottom sheet component
	 */
	open() {
		this._visible = true;
		this.changeDetector.detectChanges();
	}

	/**
	 * Closes bottom sheet component
	 */
	close() {
		this._visible = false;
		this.changeDetector.detectChanges();
	}

	/**
	 * Toggles bottom sheet component
	 */
	toggle() {
		this._visible = !this._visible;
		this.changeDetector.detectChanges();
	}

	onPan(event) {
		const delta = event.deltaY;

		if (event.deltaY > 0) {
			this.deltaY = delta;
		}

		if (event.isFinal) {
			const height = this.bottomSheetContainer.nativeElement.clientHeight;
			if (this.deltaY > (height / 2.5)) {
				this.close();
			} else {
				this.deltaY = 0;
			}
			// this.deltaY = 0;
		}

		if (this._visible) {
			this.bottomSheetContainer.nativeElement.style = `transform: translateY(${this.deltaY}px)`;

		}


		console.log(this.deltaY);
		// this.changeDetector.detectChanges();

	}

	public onShow() {

	}



}
