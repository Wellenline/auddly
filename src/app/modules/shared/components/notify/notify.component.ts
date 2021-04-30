import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../services/interface.service';

@Component({
	selector: 'app-notify',
	templateUrl: './notify.component.html',
	styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

	constructor(public interfaceService: InterfaceService) { }
	ngOnInit(): void {
	}

}
