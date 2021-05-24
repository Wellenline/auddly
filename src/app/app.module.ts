
import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LazyLoadImageModule, scrollPreset } from "ng-lazyload-image";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerComponent } from "./components/player/player.component";
import { InfiniteScrollComponent } from "./components/infinite-scroll/infinite-scroll.component";
import { TrackListComponent } from "./components/track-list/track-list.component";
import { TracksComponent } from "./pages/tracks/tracks.component";
import { HttpService } from "./services/http.service";
import { SearchComponent } from "./pages/search/search.component";
import { AlbumComponent } from "./pages/album/album.component";
import { ArtistComponent } from "./pages/artist/artist.component";
import { QueueComponent } from "./pages/queue/queue.component";
import { FormatSecondsPipe } from "./pipes/format-seconds.pipe";
import { SettingsComponent } from "./pages/settings/settings.component";
import { PlayerService } from "./services/player.service";
import { SizePipe } from "./pipes/size.pipe";
import { SliderComponent } from "./components/slider/slider.component";
import { IndicatorComponent } from "./components/common/indicator/indicator.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HorizontalScrollComponent } from "./components/horizontal-scroll/horizontal-scroll.component";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MainComponent } from "./layouts/main/main.component";
import { SharedModule } from "./modules/shared/shared.module";
import { SwiperModule } from "swiper/angular";
import { LibraryComponent } from "./pages/library/library.component";
import { ThemeToggleComponent } from "./components/theme-toggle/theme-toggle.component";
import { DragScrollModule } from "ngx-drag-scroll";

import SwiperCore, { EffectCoverflow, Lazy, Swiper, SwiperOptions, Virtual } from "swiper/core";
import { AuthComponent } from "./layouts/auth/auth.component";
import { ConnectComponent } from "./pages/connect/connect.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { UploadComponent } from "./pages/settings/upload/upload.component";
import { NowPlayingComponent } from "./pages/now-playing/now-playing.component";
import { ModalContainerComponent } from "./layouts/modal-container/modal-container.component";

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import * as Hammer from "hammerjs";

SwiperCore.use([Virtual, EffectCoverflow, Lazy]);
@Injectable()
export class HammerConfig extends HammerGestureConfig {
	overrides = {
		swipe: { direction: Hammer.DIRECTION_ALL },
		pan: { direction: Hammer.DIRECTION_VERTICAL }
	};
}

@NgModule({
	declarations: [
		AppComponent,
		PlayerComponent,
		InfiniteScrollComponent,
		TrackListComponent,
		TracksComponent,
		SearchComponent,
		AlbumComponent,
		ArtistComponent,
		QueueComponent,
		FormatSecondsPipe,
		SettingsComponent,
		SizePipe,
		SliderComponent,
		IndicatorComponent,
		HorizontalScrollComponent,
		MainComponent,
		LibraryComponent,
		ThemeToggleComponent,
		AuthComponent,
		ConnectComponent,
		UploadComponent,
		NowPlayingComponent,
		ModalContainerComponent,
	],

	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		SharedModule,
		FormsModule,
		CommonModule,
		SwiperModule,
		DragScrollModule,
		HammerModule,
		LazyLoadImageModule,
		AppRoutingModule,
		VirtualScrollerModule,
		ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
	providers: [HttpService, PlayerService, {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true,
	}, {
			provide: HAMMER_GESTURE_CONFIG,
			useClass: HammerConfig,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
