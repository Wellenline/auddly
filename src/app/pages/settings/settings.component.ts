import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
	public settings: any = {};
	public server: any = {};

	constructor(private httpService: HttpService) { }

	ngOnInit(): void {
		this.fetchServerInfo();
	}

	public fetchServerInfo() {
		this.httpService.get(`/system/info`).subscribe((response: any) => {
			this.server = response;
		}, (err) => {
			console.log(err);
		});
	}
	onSync() {
		this.httpService.get(`/system/sync`).subscribe((response: any) => {
			this.server = response;
		}, (err) => {
			console.log(err);
		});
	}
}
