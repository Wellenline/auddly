import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { RootComponent } from "./layouts/root/root.component";
import { NowPlaylingComponent } from "./overlays/now-playling/now-playling.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { PlaylistsComponent } from "./pages/playlists/playlists.component";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { UploadComponent } from "./overlays/upload/upload.component";
import { UsersComponent } from "./pages/users/users.component";

const routes: Routes = [
	{ path: "", redirectTo: "/dashboard", pathMatch: "full" },

	{
		path: "auth/login", component: LoginComponent
	},

	{
		path: "",
		component: RootComponent,
		canActivateChild: [AuthGuard],
		children: [{
			path: "",
			redirectTo: "/",
			pathMatch: "full"

		},
		{
			path: "dashboard",
			component: DashboardComponent
		},
		{
			path: "albums",
			component: AlbumsComponent
		},
		{
			path: "tracks",
			component: TracksComponent
		},
		{
			path: "artists",
			component: ArtistsComponent
		},

		{
			path: "playlists",
			component: PlaylistsComponent
		},

		{
			path: "queue",
			component: NowPlaylingComponent
		}]
	},


];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: "disabled",
		// relativeLinkResolution: "legacy"
	})],
	exports: [RouterModule],
})
export class AppRoutingModule { }
