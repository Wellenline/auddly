import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [{
	path: "", component: AuthComponent,
	redirectTo: "login", pathMatch: "full",
	children: [{
		path: "login", component: LoginComponent
	}]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
