import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, flatMap, mergeMap, switchMap, take, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private authService: AuthService, private router: Router) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authReq = req;
		const token = localStorage.getItem("token");
		if (token !== null) {
			authReq = this.addTokenHeader(req, token);
		}
		return next.handle(authReq).pipe(catchError(error => {
			console.log(error instanceof HttpErrorResponse, !authReq.url.includes("auth"), error.status);

			if (error instanceof HttpErrorResponse && !authReq.url.includes("auth") && error.status === 401) {
				return this.handle401Error(authReq, next);
			}

			return throwError(new Error(error));
		}));
	}

	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);

			return this.authService.refreshAccessToken().pipe(
				switchMap((token: any) => {
					this.isRefreshing = false;

					this.authService.validate(token.access_token, {
						refresh_token: token.refresh_token,
					});

					this.refreshTokenSubject.next(token.access_token);

					return next.handle(this.addTokenHeader(request, token.access_token));
				}),
				catchError((err) => {
					console.log(err);
					this.isRefreshing = false;
					this.authService.clear();
					this.router.navigate(["/auth", { outlets: { modal: null } }]);
					return throwError(new Error(err));
				})
			);

		}

		return this.refreshTokenSubject.pipe(
			filter(token => token !== null),
			take(1),
			switchMap((token) => next.handle(this.addTokenHeader(request, token)))
		);
	}

	private addTokenHeader(request: HttpRequest<any>, token: string) {
		return request.clone({ headers: request.headers.set("Authorization", `Bearer ${token}`) });
	}
}
