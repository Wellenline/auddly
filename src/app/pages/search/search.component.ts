import { Component, OnInit } from "@angular/core";
import { debounce } from "src/app/utils";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
	public results = [];
	constructor(private httpService: HttpService) { }

	public ngOnInit(): void {
	}
	@debounce(300)
	public onSearch(e) {

		const search = e.target.value && e.target.value.length >= 3 ? e.target.value : "";
		if (search.length < 3) {
			return;
		}

		this.httpService.get(`/search?q=${search}`).subscribe((response: any) => {
			this.results = response;
		});
	}
}
