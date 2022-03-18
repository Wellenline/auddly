import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
	{ path: "", redirectTo: "music", pathMatch: "full" },

	{ path: "auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule) },


	{ path: "music", canActivate: [AuthGuard], loadChildren: () => import("./modules/music/music.module").then(m => m.MusicModule) },

	{ path: "settings", canActivate: [AuthGuard], loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule) },


];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: "disabled",
		// relativeLinkResolution: "legacy"
	})],
	exports: [RouterModule],
})
export class AppRoutingModule { }
