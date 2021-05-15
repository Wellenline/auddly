import { trigger, transition, style, animate } from "@angular/animations";

export const SlideUpToggleAnimation = [
	trigger("slideUpToggle", [
		transition(":enter", [
			style({ transform: "translateY(100%)" }),
			animate("200ms ease-in", style({ transform: "translateY(0%)" }))
		]),
		transition(":leave", [
			animate("200ms ease-in", style({ transform: "translateY(100%)" }))
		])
	])
];