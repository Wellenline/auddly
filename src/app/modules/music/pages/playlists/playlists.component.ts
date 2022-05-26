import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { DetailsComponent } from 'src/app/modules/settings/pages/details/details.component';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { PlaylistComponent } from '../../components/playlist/playlist.component';

@Component({
	selector: 'app-playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

	public playlists = [];
	constructor(public playlistService: PlaylistService, private modalService: ModalService) { }

	ngOnInit(): void {
		this.playlistService.getPlaylists().subscribe((response: { data: [] }) => {
			this.playlists = response.data;
		});
	}
	public onPlaylist(id: string) {
		this.modalService.show({
			component: PlaylistComponent,
			class: "fullscreen",
			params: {
				id,
			}

		});
	}
	public onEdit(playlist) {

	}

	public onDelete(playlist) {

	}
}
