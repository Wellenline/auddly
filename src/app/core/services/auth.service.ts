import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
	providedIn: "root"
})
export class AuthService {

	constructor(private httpService: HttpService) { }

	public authorize(connection: { endpoint: string, key?: string }) {
		if (connection.endpoint) {
			this.httpService.API_ENDPOINT = connection.endpoint;
			localStorage.setItem("api", connection.endpoint);

		}

		if (connection.key) {
			this.httpService.API_KEY = connection.key;
			localStorage.setItem("key", connection.key);
		}
	}

	public authorized() {
		return !!this.httpService.API_ENDPOINT;
	}

	public disconnect() {
		this.httpService.API_ENDPOINT = null;
		this.httpService.API_KEY = null;
		localStorage.clear();
	}
}
