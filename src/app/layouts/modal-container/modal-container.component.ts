import { trigger, state, style, transition, animate, group, query, animateChild } from "@angular/animations";
import { Location } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-modal-container",
	templateUrl: "./modal-container.component.html",
	styleUrls: ["./modal-container.component.scss"],
	animations: [
		trigger("routeAnimation", [

			transition("* <=> *", [

				query(":enter, :leave", style({
					position: "fixed",
					left: 0,
					right: 0,
					width: "100%",

				}), {
					optional: true,
				}),
				group([
					query(":enter", [

						style({ transform: "translateY(100%)" }),
						animate("260ms ease-in-out", style({ transform: "translateY(0%)" })),
						animateChild()

					], { optional: true }),
					query(":leave", [

						animate("260ms ease-in-out", style({ transform: "translateY(100%)" })),
						animateChild()
					],
						{ optional: true }),
				]),

			])


		])]
})
export class ModalContainerComponent implements OnInit {
	destroy = new Subject<any>();
	currentDialog = null;

	constructor(
		private location: Location,
	) {
	}

	ngOnInit(): void {
	}

	@HostListener("document:keydown.escape", ["$event"])
	public onKeydownHandler(evt: KeyboardEvent) {
		this.location.back();
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
	}

}
