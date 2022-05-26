import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { PlaylistFormComponent } from '../playlist-form/playlist-form.component';

@Component({
	selector: 'app-playlist-items',
	templateUrl: './playlist-items.component.html',
	styleUrls: ['./playlist-items.component.scss']
})
export class PlaylistItemsComponent implements OnInit {

	public playlists = [];
	public loading = false;
	constructor(public playlistService: PlaylistService, private modalService: ModalService, public modalComponent: ModalComponent) { }

	ngOnInit(): void {
		this.playlistService.getPlaylists().subscribe((response: { data: [] }) => {
			this.playlists = response.data;
		});
	}

	public onAdd(playlist) {


		if (this.modalComponent.params.id) {
			this.playlistService.addTrack(playlist._id, this.modalComponent.params.id).subscribe({
				next: (response: { playlist: any }) => {
					this.modalComponent.onClose(playlist);
				},
				error: (err) => {
					alert(err);
				}

			});
		}
		// this.invites.push({});

	}

	public onCreate() {
		this.modalService.show({
			component: PlaylistFormComponent,
			callback: (playlist) => {
				if (playlist) {
					this.playlists.push(playlist);
				}
			}
		});
	}



}
