import { Directive, Output, HostBinding, HostListener, EventEmitter } from "@angular/core";

@Directive({
	selector: "[appDragDrop]",
})
export class DragDropDirective {

	@Output() public onFileDropped = new EventEmitter<any>();

	@HostBinding("style.background-color") private background = "#fff";
	@HostBinding("style.opacity") private opacity = "1";

	// Dragover listener
	@HostListener("dragover", ["$event"]) public onDragOver(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = "#eee";
		this.opacity = "0.8";
	}

	// Dragleave listener
	@HostListener("dragleave", ["$event"]) public onDragLeave(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = "#fff";
		this.opacity = "1";
	}

	// Drop listener
	@HostListener("drop", ["$event"]) public ondrop(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = "#fff";
		this.opacity = "1";
		const files = evt.dataTransfer.files;
		if (files.length > 0) {
			this.onFileDropped.emit(files);
		}
	}

}