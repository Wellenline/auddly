import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlaylistsRoutingModule } from "./playlists-routing.module";
import { PlaylistsComponent } from "./playlists.component";
import { AddToPlaylistComponent } from "./components/add-to-playlist/add-to-playlist.component";
import { SharedModule } from "src/app/shared/shared.module";
import { IndexComponent } from './pages/index/index.component';
import { DetailsComponent } from './pages/details/details.component';
import { PlaylistFormComponent } from './components/playlist-form/playlist-form.component';


@NgModule({
	declarations: [
		AddToPlaylistComponent,
		PlaylistsComponent,
		IndexComponent,
		DetailsComponent,
  PlaylistFormComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		PlaylistsRoutingModule
	],
	exports: [AddToPlaylistComponent]
})
export class PlaylistsModule { }
