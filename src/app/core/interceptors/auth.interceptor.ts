import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


	constructor(private router: Router, private authService: AuthService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(tap(() => { },
			(err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status !== 401) {
						return;
					}
					this.authService.disconnect();
					this.router.navigate(["/auth/connect"]);
				}
			}));
	}

}
