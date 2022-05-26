import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MusicRoutingModule } from "./music-routing.module";
import { MusicComponent } from "./music.component";
import { SearchComponent } from "./pages/search/search.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { SharedModule } from "../../shared/shared.module";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { TrackItemComponent } from "./components/track-item/track-item.component";
import { ArtistComponent } from "./components/artist/artist.component";
import { AlbumComponent } from "./components/album/album.component";
import { NowPlaylingComponent } from "./components/now-playling/now-playling.component";
import { PlaylistComponent } from "./components/playlist/playlist.component";
import { PlaylistsModule } from "../playlists/playlists.module";


@NgModule({
	declarations: [
		MusicComponent,
		SearchComponent,
		AlbumsComponent,
		ArtistsComponent,
		TracksComponent,
		TrackItemComponent,
		ArtistComponent,
		AlbumComponent,
		NowPlaylingComponent,
		PlaylistComponent,
	],
	imports: [
		CommonModule,
		PlaylistsModule,
		SharedModule,
		MusicRoutingModule
	]
})
export class MusicModule { }
