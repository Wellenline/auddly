import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from 'src/app/core/services/playlist.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
	public playlists = [];
	constructor(public playlistService: PlaylistService) { }

	ngOnInit(): void {
		this.playlistService.getPlaylists().subscribe((response: { data: [] }) => {
			this.playlists = response.data;
		});
	}

	public onEdit(playlist) {

	}

	public onDelete(playlist) {

	}

}
