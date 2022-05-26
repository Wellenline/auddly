import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";
import { AuthService } from "src/app/core/services/auth.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { UploadComponent } from "../upload/upload.component";
import { Location } from "@angular/common";

@Component({
	selector: "app-details",
	templateUrl: "./details.component.html",
	styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
	public settings: any = {};
	public server: any = {};
	public loading = true;
	public colors = ["#3ec7c2", "#0fdbff", "#4caf50", "#3c91ff", "#7fcd91", "#fe346e", "#381460", "#ffa41b", "#9399ff", "#21bf73", "#C1935B", "#F0050E"];
	public api_key = localStorage.getItem("key");
	constructor(public httpService: HttpService, private authService: AuthService, private modalService: ModalService, private location: Location) { }

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
		}).add(() => {
			this.loading = false;
		});
	}
	public onBack() {
		this.location.back();
	}
	public onDisconnect() {
		this.authService.clear();
		location.reload();
	}

	public onUpload() {
		this.modalService.show({
			component: UploadComponent,
		});
	}

}