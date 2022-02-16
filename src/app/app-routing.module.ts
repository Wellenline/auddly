import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { MainComponent } from "./layouts/main/main.component";

const routes: Routes = [
	/*{
		path: "auth",
		component: AuthComponent,
		children: [
			{ path: "", redirectTo: "connect", pathMatch: "full" },
			{ path: "connect", component: ConnectComponent, },

		]
	},*/
	{ path: "auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule) },

	{

		path: "",
		component: MainComponent, canActivate: [AuthGuard],
		children: [

			{ path: "", redirectTo: "music", pathMatch: "full" },

			{ path: "music", loadChildren: () => import("./modules/music/music.module").then(m => m.MusicModule) },

			{ path: "settings", loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule) },
		]
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
