import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./pages/login/login.component";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
	declarations: [AuthComponent, LoginComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		SharedModule,
	]
})
export class AuthModule { }
