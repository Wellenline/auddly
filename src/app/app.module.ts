
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



@NgModule({
	declarations: [
		AppComponent,
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
