import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-tag-input",
	templateUrl: "./tag-input.component.html",
	styleUrls: ["./tag-input.component.scss"]
})
export class TagInputComponent implements OnInit {
	@Input() public items = ["asfafaw@rfasfa.com", "asfafaw@rfasfa.com", "asfafaw@rfasfa.com", "asfafaw@rfasfa.com", "asfafaw@rfasfa.com", "asfafaw@rfasfa.com", "asfafaw@rfasfa.com"];
	@Input() public placeholder: string;

	@Output() public itemsChange = new EventEmitter();

	@Input() public values = [];
	public itemText: string;
	constructor() { }

	ngOnInit(): void {
	}

	public onAdd(value?: string) {
		this.items.push(value || this.itemText);
		this.itemText = "";

		// this.itemChange.emit(this.items);

	}

	public onRemove(i) {
		this.items.splice(i, 1);
		this.itemsChange.emit(this.items);

	}

	public isSelected(item) {
		return this.items.indexOf(item) > -1;
	}

}
