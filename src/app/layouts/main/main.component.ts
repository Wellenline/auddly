import { Component, HostListener, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}


	public theme() {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		let targetTheme = "light";

		if (currentTheme === "light") {
			targetTheme = "dark";
		}

		document.documentElement.setAttribute("data-theme", targetTheme);
	}
	ngAfterViewInit() {

	}

	public onLogout() {
		// this.authService.clear();
		this.router.navigate(["/login"]);
	}
}
