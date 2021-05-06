import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-connect",
	templateUrl: "./connect.component.html",
	styleUrls: ["./connect.component.scss"]
})
export class ConnectComponent implements OnInit {
	public connection: { endpoint: string, key?: string } = {
		endpoint: this.httpService.API_ENDPOINT || "",
	};
	public step = 0;
	public error: string;
	constructor(private authService: AuthService, private router: Router, private httpService: HttpService) { }

	ngOnInit(): void {
	}

	public connect() {
		this.error = "";
		this.authService.authorize(this.connection);
		this.httpService.post(`/connect`, this.connection).subscribe((response: { connected: boolean, error?: string }) => {
			const { connected, error } = response;
			if (connected) {
				return this.router.navigate(["/"]);
			}
			this.step = 1;

			if (error) {
				this.error = error;
			}

		}, (err) => {
			this.authService.disconnect();
			this.error = `Failed to connect to ${this.connection.endpoint}. ${err !== undefined ? err : ""}`;

		});

	}

}
