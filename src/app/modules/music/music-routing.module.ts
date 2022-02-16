import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MusicComponent } from "./music.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { SearchComponent } from "./pages/search/search.component";
import { TracksComponent } from "./pages/tracks/tracks.component";

const routes: Routes = [{
	path: "", component: MusicComponent, children: [
		{ path: "", redirectTo: "search", pathMatch: "full" },

		// { path: "", component: SearchComponent },

		{
			path: "Search",
			component: SearchComponent
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
			path: "search",
			component: SearchComponent
		},
		{
			path: "artists",
			component: ArtistsComponent
		}
	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MusicRoutingModule { }
