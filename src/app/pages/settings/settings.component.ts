import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import * as qrcode from "qrcode";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit, AfterViewInit {
	public settings: any = {};
	public server: any = {};

	@ViewChild("qr") public qr: ElementRef;
	constructor(public httpService: HttpService) { }

	ngOnInit(): void {
		this.fetchServerInfo();
	}

	ngAfterViewInit() {
		qrcode.toCanvas(this.qr.nativeElement, `${this.httpService.API_ENDPOINT}?key=${this.httpService.API_KEY}`, {
			errorCorrectionLevel: "H",
			margin: 1,
			scale: 8,
			color: {
				dark: "#000",
				light: "#fff",
			},
		});
	}

	public fetchServerInfo() {
		this.httpService.get(`/system/info`).subscribe((response: any) => {
			this.server = response;
		}, (err) => {
			console.log(err);
		});
	}

	public onDisconnect() {
		this.httpService.disconnect();
		location.reload();
	}

	public onSync() {
		this.httpService.get(`/system/sync`).subscribe((response: any) => {
			this.server = response;
		}, (err) => {
			console.log(err);
		});
	}
}
