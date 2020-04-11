import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-tracks",
	templateUrl: "./tracks.component.html",
	styleUrls: ["./tracks.component.scss"],
})
export class TracksComponent implements OnInit {
	public tracks = [];
	constructor(private httpService: HttpService) { }

	ngOnInit(): void {

		this.httpService.get("/tracks").subscribe((response: any) => {
			this.tracks = response;
		});
	}

}
