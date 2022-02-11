import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MusicRoutingModule } from "./music-routing.module";
import { MusicComponent } from "./music.component";
import { SearchComponent } from "./pages/search/search.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { PlaylistsComponent } from "./pages/playlists/playlists.component";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
	declarations: [MusicComponent, SearchComponent, AlbumsComponent, ArtistsComponent, PlaylistsComponent],
	imports: [
		CommonModule,
		SharedModule,
		MusicRoutingModule
	]
})
export class MusicModule { }
