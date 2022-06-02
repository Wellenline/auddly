import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "src/app/core/services/http.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	public connection: { endpoint: string, key?: string } = {
		endpoint: this.httpService.API_ENDPOINT || "",
	};
	public user: { email?: string, password?: string, } = {
		email: "",
		password: "",
	};
	public loading = false;
	public step = 0;
	public error: string;
	constructor(private authService: AuthService, private router: Router, private httpService: HttpService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		if (this.connection.endpoint) {
			this.step = 1;
		}

		this.route.queryParams.subscribe((params) => {
			if (params.server) {
				this.connection.endpoint = params.server;
				this.connect();
			}
		});

	}

	public connect() {
		this.error = "";
		this.step = 0;
		this.authService.testConnection(this.connection).subscribe((response: any) => {
			this.step = 1;
		}, (err) => {
			this.error = `Failed to connect to ${this.connection.endpoint}. Make sure the server is running ${err !== undefined ? err : ""}`;
			this.authService.clear();
		});
		/*this.authService.authorize(this.connection);
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

		});*/

	}

	public onLogin() {
		if (this.user?.email && this.user?.password) {
			this.loading = true;

			this.authService.login({
				provider: "email",
				data: this.user,
			}).subscribe((response: any) => {
				console.log(response, "logged in");
				this._navigate();
			}, (err) => {
				this.loading = false;
				this.error = err;
			});

		}
	}

	private _navigate() {
		this.router.navigate(["/"]);
	}
}
