import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerComponent } from "./components/player/player.component";
import { MenuComponent } from "./components/menu/menu.component";
import { InfiniteScrollComponent } from "./components/infinite-scroll/infinite-scroll.component";
import { TrackListComponent } from "./components/track-list/track-list.component";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { HttpService } from "./services/http.service";

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
		HttpClientModule,
		CommonModule,
		AppRoutingModule,
	],
	providers: [HttpService],
	bootstrap: [AppComponent],
})
export class AppModule { }
