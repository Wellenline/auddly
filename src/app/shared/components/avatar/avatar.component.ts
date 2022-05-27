import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
	@Input() public name: string = "";
	@Input() public picture: string;
	@Input() public width: number | string = 60;
	@Input() public height: number | string = 60;
	@Input() public borderRadius: string = "50%";
	@Input() public verified: boolean;

	constructor() { }

	ngOnInit(): void {
	}

}
