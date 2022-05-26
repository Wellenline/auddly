import { Component, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
	selector: 'app-playlist-form',
	templateUrl: './playlist-form.component.html',
	styleUrls: ['./playlist-form.component.scss']
})
export class PlaylistFormComponent implements OnInit {
	public error: string;
	public playlist: { name?: string, _id?: string } = {};
	constructor(public modalComponent: ModalComponent) { }

	ngOnInit(): void {
	}

	public onSave() {

	}

	private _update() {

	}

	private _create() {
	}

}
