import { trigger, transition, style, animate, state } from "@angular/animations";

export const SlideUpToggleAnimation = [
	trigger("slideUpToggle", [
		state("open", style({
			"height": "100%", "opacity": "1"
		})),
		state("closed", style({
			"height": "0", "opacity": "0"
		})),
		transition(":enter", [
			style({ transform: "translateY(100%)" }),
			animate("260ms ease-in", style({ transform: "translateY(0%)" }))
		]),
		transition(":leave", [
			animate("260ms ease-in", style({ transform: "translateY(100%)" }))
		]),
		transition("closed => open", [

			style({ transform: "translateY(100%)", "opacity": "1", "height": "100%" }),


			animate("260ms ease-in", style({ transform: "translateY(0%)" }))
		]),
		transition("open => closed", [

			animate("260ms ease-in", style({ transform: "translateY(100%)" })),
			style({ "opacity": "0", "height": "0" }),



		])
	])
];