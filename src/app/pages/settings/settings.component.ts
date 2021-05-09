import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit, AfterViewInit {
	public settings: any = {};
	public server: any = {};
	public colors = ["#3ec7c2", "#4caf50", "#3c91ff", "#7fcd91", "#fe346e", "#381460", "#ffa41b", "#9399ff", "#21bf73", "#C1935B", "#F0050E"];
	public api_key = localStorage.getItem("key");
	@ViewChild("qr") public qr: ElementRef;
	constructor(public httpService: HttpService, private authService: AuthService) { }

	ngOnInit(): void {
		this.fetchServerInfo();
	}

	ngAfterViewInit() {

	}

	public setTheme(color: string) {
		document.documentElement.style.setProperty("--accent-color", color);
		localStorage.setItem("accent-color", color);
	}

	public fetchServerInfo() {
		this.httpService.get(`/info`).subscribe((response: any) => {
			this.server = response;
		}, (err) => {
			console.log(err);
		});
	}

	public onDisconnect() {
		this.authService.disconnect();
		location.reload();
	}

}
