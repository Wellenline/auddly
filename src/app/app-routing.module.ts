import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { QueueComponent } from "./pages/queue/queue.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { AlbumComponent } from "./pages/album/album.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { ArtistComponent } from "./pages/artist/artist.component";
import { SearchComponent } from "./pages/search/search.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { SetupComponent } from "./pages/setup/setup.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [

	{ path: "", redirectTo: "discover", pathMatch: "full" },
	{ path: "discover", component: TracksComponent, canActivate: [AuthGuard] },

	{ path: "tracks", component: TracksComponent, canActivate: [AuthGuard] },

	{ path: "albums", component: AlbumsComponent, canActivate: [AuthGuard] },
	{ path: "albums/:id", component: AlbumComponent, canActivate: [AuthGuard] },

	{ path: "artists", component: ArtistsComponent, canActivate: [AuthGuard] },
	{ path: "artists/:id", component: ArtistComponent, canActivate: [AuthGuard] },

	{ path: "search", component: SearchComponent, canActivate: [AuthGuard] },
	{ path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },

	{ path: "queue", component: QueueComponent, canActivate: [AuthGuard] },

	{ path: "setup", component: SetupComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: "enabled",
	})],
	exports: [RouterModule],
})
export class AppRoutingModule { }
