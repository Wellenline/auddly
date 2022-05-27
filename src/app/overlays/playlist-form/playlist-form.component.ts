import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
	selector: 'app-playlist-form',
	templateUrl: './playlist-form.component.html',
	styleUrls: ['./playlist-form.component.scss']
})
export class PlaylistFormComponent implements OnInit {
	public error: string;
	public playlist: { name?: string, _id?: string } = {};
	constructor(public modalComponent: ModalComponent, private playlistService: PlaylistService) { }

	ngOnInit(): void {
		if (this.modalComponent.params.playlist) {
			this.playlist = this.modalComponent.params.playlist;
		}
	}

	public onSave() {
		if (this.playlist._id) {
			this._update();
		} else {
			this._create();
		}
	}

	private _update() {
		this.playlistService.update(this.playlist._id, { name: this.playlist.name }).subscribe({
			next: (playlist) => {
				this.modalComponent.onClose(playlist);
			},
			error: (err) => {
				this.error = err;
			}
		});
	}


	private _create() {
		this.playlistService.create(this.playlist).subscribe({
			next: (playlist) => {
				this.modalComponent.onClose(playlist);
			},
			error: (err) => {
				this.error = err;
			}
		});
	}

}
