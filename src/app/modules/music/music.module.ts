import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MusicRoutingModule } from "./music-routing.module";
import { MusicComponent } from "./music.component";
import { SearchComponent } from "./pages/search/search.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { PlaylistsComponent } from "./pages/playlists/playlists.component";
import { SharedModule } from "../../shared/shared.module";
import { TracksComponent } from './pages/tracks/tracks.component';
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { QueueComponent } from './components/queue/queue.component';
import { NowPlaylingComponent } from './components/now-playling/now-playling.component';


@NgModule({
	declarations: [MusicComponent, SearchComponent, AlbumsComponent, ArtistsComponent, PlaylistsComponent, TracksComponent, TrackListComponent, TrackItemComponent, ArtistComponent, AlbumComponent, QueueComponent, NowPlaylingComponent],
	imports: [
		CommonModule,
		SharedModule,
		VirtualScrollerModule,
		MusicRoutingModule
	]
})
export class MusicModule { }
