import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { PlaylistFormComponent } from 'src/app/overlays/playlist-form/playlist-form.component';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { PlaylistComponent } from '../../overlays/playlist/playlist.component';
import { SidebarService } from 'src/app/standalone/sidebar/sidebar.service';

@Component({
	selector: 'app-playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

	public playlists = [];
	constructor(public playlistService: PlaylistService, private m: ModalService, private modalService: SidebarService) { }

	ngOnInit(): void {
		this.getPlaylists();

	}
	public getPlaylists() {
		this.playlistService.getPlaylists().subscribe((response: { data: [] }) => {
			this.playlists = response.data;
			this.getSuggestions();
		});
	}

	public getSuggestions() {
		this.playlistService.getSuggestions().subscribe((response: []) => {
			this.playlists.push(...response);
		});
	}
	public onPlaylist(id: string, tracks) {
		this.modalService.show({
			component: PlaylistComponent,
			class: "fullscreen",
			params: {
				id,
				tracks
			}

		});
	}
	public onCreate() {
		this.m.show({
			component: PlaylistFormComponent,
			callback: (response: { data: any }) => {
				this.getPlaylists();

			},
		})

	}

	public onDelete(playlist) {

	}
}
