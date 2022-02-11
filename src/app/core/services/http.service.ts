import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class HttpService {
	public API_ENDPOINT = environment.domain.api;
	public ACCESS_TOKEN: string;
	constructor(private http: HttpClient) { }

	public get(path: any) {
		return this.http.get(`${this.API_ENDPOINT}${path}`, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res),
		);
	}

	public post(path: string, data: any) {
		return this.http.post(`${this.API_ENDPOINT}${path}`, data, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}

	public upload(path: any, data: any) {
		return this.http.post(`${this.API_ENDPOINT}${path}`, data, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}

	public put(path: any, data: any) {
		return this.http.put(`${this.API_ENDPOINT}${path}`, data, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}

	public patch(path: any, data: any) {
		return this.http.patch(`${this.API_ENDPOINT}${path}`, data, {
			headers: {
				...this.headers(),
				"Content-Type": "multipart/form-data",
			},
		}).pipe(
			catchError(this.handleError), map((res) => res));
	}

	public delete(path: any, body?: any) {
		return this.http.delete(`${this.API_ENDPOINT}${path}`, {
			headers: this.headers(),
		}).pipe(
			catchError(this.handleError), map((res) => res));
	}

	private headers() {
		const headers = new HttpHeaders();
		headers.set("Accept", "application/json");

		if (this.ACCESS_TOKEN) {
			headers.set("Authorization", `Bearer ${this.ACCESS_TOKEN}`);
		}

		return headers;
	}
	private handleError(error: HttpErrorResponse) {
		// alert(JSON.stringify(error, null, 4));
		if (error.error instanceof ErrorEvent) {
			console.error("An error occurred:", error.error.message);
		} else {
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error.message}`);
			return throwError(
				error.error.all_errors ? error.error.all_errors.join("\n") : error.error.message);
		}
		return throwError(
			"Something bad happened; please try again later.");
	}

}
