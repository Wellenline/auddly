import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerComponent } from "./components/player/player.component";
import { MenuComponent } from "./components/menu/menu.component";
import { InfiniteScrollComponent } from "./components/infinite-scroll/infinite-scroll.component";
import { TrackListComponent } from "./components/track-list/track-list.component";
import { TracksComponent } from "./pages/tracks/tracks.component";

@NgModule({
	declarations: [
		AppComponent,
		PlayerComponent,
		MenuComponent,
		InfiniteScrollComponent,
		TrackListComponent,
		TracksComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
