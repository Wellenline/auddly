import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LazyLoadImageModule, scrollPreset } from "ng-lazyload-image";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerComponent } from "./components/player/player.component";
import { MenuComponent } from "./components/menu/menu.component";
import { InfiniteScrollComponent } from "./components/infinite-scroll/infinite-scroll.component";
import { TrackListComponent } from "./components/track-list/track-list.component";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { HttpService } from "./services/http.service";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { SearchComponent } from "./pages/search/search.component";
import { AlbumComponent } from "./pages/album/album.component";
import { ArtistComponent } from "./pages/artist/artist.component";
import { QueueComponent } from "./pages/queue/queue.component";
import { FormatSecondsPipe } from "./pipes/format-seconds.pipe";
import { SettingsComponent } from "./pages/settings/settings.component";
import { PlayerService } from "./services/player.service";
import { AlbumListComponent } from "./components/album-list/album-list.component";
import { ArtistListComponent } from "./components/artist-list/artist-list.component";
import { SetupComponent } from "./pages/setup/setup.component";
import { DiscoverComponent } from "./pages/discover/discover.component";
import { PlaylistListComponent } from "./components/playlist-list/playlist-list.component";
import { PlaylistComponent } from "./pages/playlist/playlist.component";
import { FavouritesComponent } from "./pages/favourites/favourites.component";
import { AudioVisualizerComponent } from "./components/audio-visualizer/audio-visualizer.component";
import { ToastComponent } from "./components/common/toast/toast.component";
import { DialogComponent } from "./components/common/dialog/dialog.component";
import { FavButtonComponent } from "./components/fav-button/fav-button.component";
import { SizePipe } from "./pipes/size.pipe";
import { TrackOptionsComponent } from "./components/track-options/track-options.component";
import { SliderComponent } from "./components/slider/slider.component";
import { PlaylistFormComponent } from "./components/playlist-form/playlist-form.component";

@NgModule({
	declarations: [
		AppComponent,
		PlayerComponent,
		MenuComponent,
		InfiniteScrollComponent,
		TrackListComponent,
		TracksComponent,
		ArtistsComponent,
		AlbumsComponent,
		SearchComponent,
		AlbumComponent,
		ArtistComponent,
		QueueComponent,
		FormatSecondsPipe,
		SettingsComponent,
		AlbumListComponent,
		ArtistListComponent,
		SetupComponent,
		DiscoverComponent,
		PlaylistListComponent,
		PlaylistComponent,
		FavouritesComponent,
		AudioVisualizerComponent,
		ToastComponent,
		DialogComponent,
		FavButtonComponent,
		SizePipe,
		TrackOptionsComponent,
		SliderComponent,
		PlaylistFormComponent,
	],

	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		LazyLoadImageModule,
		AppRoutingModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [HttpService, PlayerService],
	bootstrap: [AppComponent],
})
export class AppModule { }
