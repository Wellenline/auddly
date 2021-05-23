import { trigger, state, style, transition, animate, group, query, animateChild } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
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
		route: ActivatedRoute,
		router: Router
	) {
		route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

			// When router navigates on this component is takes the params and opens up the photo detail modal
			/*this.currentDialog = this.modalService.open(PhotoDetailComponent, { centered: true });
			this.currentDialog.componentInstance.photo = params.id;*/

			// Go back to home page after the modal is closed
			/* this.currentDialog.result.then(result => {
				 router.navigateByUrl("/");
			 }, reason => {
				 router.navigateByUrl("/");
			 });*/
		});
	}

	ngOnDestroy() {
		this.destroy.next();
	}
	ngOnInit(): void {
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
	}

}
