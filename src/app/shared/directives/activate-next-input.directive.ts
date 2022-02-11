import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
	selector: "[appActivateNextInput]"
})
export class ActivateNextInputDirective {
	constructor(private _el: ElementRef) { }

	@HostListener("input", ["$event"]) public onInputChange(event) {
		const initalValue = this._el.nativeElement.value;
		if (initalValue.length > 1) {
			this._el.nativeElement.value = initalValue.slice(0, 1);
		}
		// this._el.nativeElement.value = "1";
	}

	@HostListener("keyup", ["$event"]) public onKeyDown(e: any) {
		if (e.keyCode === 8) {
			e.preventDefault();

			let prevControl: any = e.srcElement.previousElementSibling;
			// Searching for next similar control to set it focus
			while (true) {
				if (prevControl) {
					if (prevControl.type === e.srcElement.type) {
						prevControl.focus();
						prevControl.value = "";
						return;
					} else {
						prevControl = prevControl.previousElementSibling;
					}
				} else {
					return;
				}
			}
		} else if (e.srcElement.maxLength === e.srcElement.value.length) {

			e.preventDefault();

			let nextControl: any = e.srcElement.nextElementSibling;
			// Searching for next similar control to set it focus
			while (true) {
				if (nextControl) {
					if (nextControl.type === e.srcElement.type) {
						nextControl.focus();
						return;
					} else {
						nextControl = nextControl.nextElementSibling;
					}
				} else {
					return;
				}
			}
		} else {
			e.preventDefault();
		}
	}

}
