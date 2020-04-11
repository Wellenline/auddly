import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TracksComponent } from "./pages/tracks/tracks.component";

const routes: Routes = [

	{ path: "", redirectTo: "", pathMatch: "full" },
	{ path: "tracks", component: TracksComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
