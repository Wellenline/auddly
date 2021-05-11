import { Directive, Output, HostBinding, HostListener, EventEmitter } from "@angular/core";

@Directive({
	selector: "[appDragDrop]",
})
export class DragDropDirective {

	@Output() public onFileDropped = new EventEmitter<any>();

	@HostBinding("style.background-color") private background = "var(--background-color)";
	@HostBinding("style.opacity") private opacity = "1";

	// Dragover listener
	@HostListener("dragover", ["$event"]) public onDragOver(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = "var(--background-color-2)";
		this.opacity = "0.8";
	}

	// Dragleave listener
	@HostListener("dragleave", ["$event"]) public onDragLeave(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = "var(--background-color)";
		this.opacity = "1";
	}

	// Drop listener
	@HostListener("drop", ["$event"]) public ondrop(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = "var(--background-color)";
		this.opacity = "1";
		const files = evt.dataTransfer.files;
		console.log(evt);
		if (files.length > 0) {
			this.onFileDropped.emit(files);
		}
	}

}