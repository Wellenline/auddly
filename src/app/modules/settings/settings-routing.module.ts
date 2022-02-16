import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailsComponent } from "./pages/details/details.component";
import { UploadComponent } from "./pages/upload/upload.component";

import { SettingsComponent } from "./settings.component";

const routes: Routes = [{
	path: "", component: SettingsComponent, children: [
		{
			path: "", component: DetailsComponent
		},
		{
			path: "upload", component: UploadComponent
		}
	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SettingsRoutingModule { }
