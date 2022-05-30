import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IConnectionRequest, ILoginRequest, ILoginResponse } from "../interfaces/auth";
import { environment } from "src/environments/environment";

import { HttpService } from "./http.service";
import { UserService } from "./user.service";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	public $loggedIn = new BehaviorSubject(false);

	public id: string;
	public scopes = [];

	constructor(private httpService: HttpService, private userService: UserService) { }

	public validate(token: string = localStorage.getItem("token"), options: { refresh_token?: string } = {}) {
		if (!token) {
			this.clear();
			return false;
		}

		const { exp, scopes, payload } = this.decode(token);
		const currentTime = Date.now() / 1000;

		if (exp < currentTime) {
			console.log("Token expired");
		}

		this.id = payload.id;

		this.scopes = scopes;

		this.httpService.ACCESS_TOKEN = token;
		this.httpService.API_ENDPOINT = localStorage.getItem("api");
		localStorage.setItem("token", token);
		if (options.refresh_token) {
			localStorage.setItem("refresh_token", options.refresh_token);
		}

		this.userService.getMe().subscribe();

		this.$loggedIn.next(true);


		return true;

	}

	public testConnection(data: IConnectionRequest) {
		localStorage.setItem("api", data.endpoint);
		this.httpService.API_ENDPOINT = data.endpoint;
		return this.httpService.get(`/auth/connect`);
	}

	public login(data: ILoginRequest) {
		return this.httpService.post(`/auth`, data).pipe(map((this._handleSuccessfulLogin.bind(this))));
	}


	public refreshAccessToken() {
		return this.httpService.post(`/auth/refresh`, {
			access_token: localStorage.getItem("token"),
			refresh_token: localStorage.getItem("refresh_token"),
		});
	}

	public clear() {
		localStorage.removeItem("token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("id");
		localStorage.removeItem("api");
		this.httpService.ACCESS_TOKEN = undefined;
		this.httpService.API_ENDPOINT = undefined;
		this.$loggedIn.next(false);
	}

	private _handleSuccessfulLogin(response: ILoginResponse) {
		const validated = this.validate(response.access_token, {
			refresh_token: response.refresh_token,
		});

		if (!validated) {
			return throwError(() => new Error("Failed to set access token"));
		}
		return {
			success: true,
		};
	}

	private decode(token: string) {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace("-", "+").replace("_", "/");
		return JSON.parse(window.atob(base64));
	}
}
