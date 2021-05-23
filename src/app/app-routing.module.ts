import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { QueueComponent } from "./pages/queue/queue.component";
import { AlbumComponent } from "./pages/album/album.component";
import { ArtistComponent } from "./pages/artist/artist.component";
import { SearchComponent } from "./pages/search/search.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { AuthGuard } from "./guards/auth.guard";
import { MainComponent } from "./layouts/main/main.component";
import { LibraryComponent } from "./pages/library/library.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { ConnectComponent } from "./pages/connect/connect.component";
import { UploadComponent } from "./pages/settings/upload/upload.component";
import { NowPlayingComponent } from "./pages/now-playing/now-playing.component";
import { ModalContainerComponent } from "./layouts/modal-container/modal-container.component";

const routes: Routes = [
	{
		path: "auth",
		component: AuthComponent,
		children: [
			{ path: "", redirectTo: "connect", pathMatch: "full" },
			{ path: "connect", component: ConnectComponent, },

		]
	},
	{
		path: "",
		component: MainComponent, canActivate: [AuthGuard],
		children: [

			{ path: "", redirectTo: "search", pathMatch: "full" },
			{ path: "library", redirectTo: "library/albums", pathMatch: "full", canActivate: [AuthGuard] },

			{ path: "library/albums", component: LibraryComponent, canActivate: [AuthGuard] },
			{ path: "library/artists", component: LibraryComponent, canActivate: [AuthGuard] },
			{ path: "library/playlists", component: LibraryComponent, canActivate: [AuthGuard] },

			{ path: "tracks", component: TracksComponent, canActivate: [AuthGuard] },

			/*{ path: "library/albums/:id", component: ModalContainerComponent, canActivate: [AuthGuard], outlet: "modal" },

			{ path: "library/artists/:id", component: ModalContainerComponent, canActivate: [AuthGuard], outlet: "modal" },
*/
			{ path: "search", component: SearchComponent, canActivate: [AuthGuard] },
			{ path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
			{ path: "settings/upload", component: UploadComponent, canActivate: [AuthGuard] },
			{ path: "queue", component: QueueComponent, canActivate: [AuthGuard] },
			{ path: "playing", component: NowPlayingComponent, canActivate: [AuthGuard] },

		]
	},

	{
		path: "modal",
		component: ModalContainerComponent,
		outlet: "modal",
		data: {
			animation: "open",
		},
		children: [
			{ path: "albums/:id", component: AlbumComponent, canActivate: [AuthGuard], data: { animation: "open" } },

			{ path: "artists/:id", component: ArtistComponent, canActivate: [AuthGuard], data: { animation: "open" } },
			{ path: "playing", component: NowPlayingComponent, canActivate: [AuthGuard], data: { animation: "open" } },
			{ path: "queue", component: QueueComponent, canActivate: [AuthGuard] },

		]
	},


];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: "enabled",
		relativeLinkResolution: "legacy"
	})],
	exports: [RouterModule],
})
export class AppRoutingModule { }
