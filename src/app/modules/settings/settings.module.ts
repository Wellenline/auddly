import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { UploadComponent } from "./pages/upload/upload.component";
import { DetailsComponent } from "./pages/details/details.component";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
	declarations: [SettingsComponent, UploadComponent, DetailsComponent],
	imports: [
		CommonModule,
		SharedModule,
		SettingsRoutingModule
	]
})
export class SettingsModule { }
