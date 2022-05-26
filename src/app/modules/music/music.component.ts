import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { DetailsComponent } from "../settings/pages/details/details.component";
import { SettingsComponent } from "../settings/settings.component";
import { NowPlaylingComponent } from "./components/now-playling/now-playling.component";

@Component({
	selector: "app-music",
	templateUrl: "./music.component.html",
	styleUrls: ["./music.component.scss"]
})
export class MusicComponent implements OnInit {
	destroyed = new Subject<void>();
	currentScreenSize: string;

	// Create a map to display breakpoint names for demonstration purposes.
	displayNameMap = new Map([
		[Breakpoints.XSmall, "XSmall"],
		[Breakpoints.Small, "Small"],
		[Breakpoints.Medium, "Medium"],
		[Breakpoints.Large, "Large"],
		[Breakpoints.XLarge, "XLarge"],
	]);

	constructor(public modalService: ModalService, public breakpointObserver: BreakpointObserver) {
		breakpointObserver
			.observe([
				Breakpoints.XSmall,
				Breakpoints.Small,
				Breakpoints.Medium,
				Breakpoints.Large,
				Breakpoints.XLarge,
			])
			.pipe(takeUntil(this.destroyed))
			.subscribe(result => {
				for (const query of Object.keys(result.breakpoints)) {
					if (result.breakpoints[query]) {
						this.currentScreenSize = this.displayNameMap.get(query) ?? "Unknown";
					}
				}
			});
	}

	ngOnInit(): void {
	}

	openSettings() {
		this.modalService.show({
			component: DetailsComponent,
			class: "fullscreen"
		});
	}

	openQueue() {
		this.modalService.show({
			component: NowPlaylingComponent,

		});
	}
	ngOnDestroy() {
		this.destroyed.next();
		this.destroyed.complete();
	}
}
