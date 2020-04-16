import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-setup",
	templateUrl: "./setup.component.html",
	styleUrls: ["./setup.component.scss"],
})
export class SetupComponent implements OnInit {
	public setup: { server?: string, key?: string } = {};
	public protocol: string = "https";
	public loading = false;
	public error: string = "";
	constructor(private httpService: HttpService, private router: Router) { }

	ngOnInit(): void {
		if (this.httpService.isConnected()) {
			this.router.navigate(["/"]);
		}
	}

	public onConnect() {
		this.httpService.connect({
			server: `${this.protocol}://${this.setup.server}`,
			key: this.setup.key,
		});

		this.httpService.get(`/system/info`).subscribe((response: any) => {
			if (response._id) {
				return this.router.navigate(["/"]);
			}

			this.httpService.disconnect();

		}, (err) => {
			this.httpService.disconnect();
			console.log(err);
			this.error = `Failed to connect to ${this.protocol}://${this.setup.server}. ${err !== undefined ? err : ""}`;
		});
	}

}
