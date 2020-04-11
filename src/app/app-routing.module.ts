import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { QueueComponent } from "./pages/queue/queue.component";
import { AlbumsComponent } from "./pages/albums/albums.component";
import { AlbumComponent } from "./pages/album/album.component";
import { ArtistsComponent } from "./pages/artists/artists.component";
import { ArtistComponent } from "./pages/artist/artist.component";
import { SearchComponent } from "./pages/search/search.component";

const routes: Routes = [

	{ path: "", redirectTo: "", pathMatch: "full" },
	{ path: "tracks", component: TracksComponent },

	{ path: "albums", component: AlbumsComponent },
	{ path: "albums/:id", component: AlbumComponent },

	{ path: "artists", component: ArtistsComponent },
	{ path: "artists/:id", component: ArtistComponent },

	{ path: "search", component: SearchComponent },
	{ path: "queue", component: QueueComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
