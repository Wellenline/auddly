import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this._handleRequest(route, state);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		return this._handleRequest(route, state);
	}


	private _handleRequest(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {
		if (this.authService.validate()) {
			return true;
		}

		this.router.navigate(["/login", { outlets: { modal: null } }], {
			queryParams: {
				redirect_to: state.url.replace("/", ""),
			}
		});
		return false;
	}

}
