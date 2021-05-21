import { trigger, transition, style, animate } from "@angular/animations";

export const SlideUpToggleAnimation = [
	trigger("slideUpToggle", [
		transition(":enter", [
			style({ transform: "translateY(100%)" }),
			animate("200ms ease-in", style({ transform: "translateY(0%)" }))
		]),
		transition(":leave", [
			animate("200ms ease-in", style({ transform: "translateY(100%)" }))
		]),
		transition("closed => open", [
			style({ transform: "translateY(100%)" }),
			animate("260ms ease-in", style({ transform: "translateY(0%)" }))
		]),
		transition("open => closed", [
			animate("260ms ease-in", style({ transform: "translateY(100%)" }))
		])
	])
];