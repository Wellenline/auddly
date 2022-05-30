
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserFormComponent } from "./overlays/user-form/user-form.component";
import { DetailsComponent } from "./pages/details/details.component";
import { UploadComponent } from "./overlays/upload/upload.component";
import { UsersComponent } from "./pages/users/users.component";
import { LoginComponent } from "./pages/login/login.component";
import { AlbumComponent } from "./overlays/album/album.component";
import { ArtistComponent } from "./overlays/artist/artist.component";
import { NowPlaylingComponent } from "./overlays/now-playling/now-playling.component";
import { PlaylistFormComponent } from "./overlays/playlist-form/playlist-form.component";
import { PlaylistItemsComponent } from "./overlays/playlist-items/playlist-items.component";
import { PlaylistComponent } from "./overlays/playlist/playlist.component";
import { TrackItemComponent } from "./overlays/track-item/track-item.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PlaylistsComponent } from "./pages/playlists/playlists.component";
import { SearchComponent } from "./overlays/search/search.component";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { RootComponent } from "./layouts/root/root.component";



@NgModule({
	declarations: [
		AppComponent,
		UploadComponent, DetailsComponent, UsersComponent, UserFormComponent,
		LoginComponent,
		RootComponent,
		SearchComponent,
		AlbumsComponent,
		ArtistsComponent,
		TracksComponent,
		TrackItemComponent,
		ArtistComponent,
		AlbumComponent,
		NowPlaylingComponent,
		PlaylistComponent,
		PlaylistsComponent,
		PlaylistFormComponent,
		PlaylistItemsComponent,
		DashboardComponent,
	],

	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		CommonModule,
		AppRoutingModule,
		ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true,
	}
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
