import { trigger, transition, style, animate } from "@angular/animations";

export const slideInOutAnimation = trigger("slideInOut", [
	transition(":enter", [
		style({ bottom: "-100px", transform: "translate(0%, 0%) scale(0.3)" }),
		animate("150ms cubic-bezier(0, 0, 0.2, 1)", style({
			transform: "translate(-0%, 0%) scale(1)",
			opacity: 1,
			bottom: "20px"
		})),
	]),
	transition(":leave", [
		animate("150ms cubic-bezier(0.4, 0.0, 1, 1)", style({
			transform: "translate(0%, 0%) scale(0.3)",
			opacity: 0,
			bottom: "-100px"
		}))
	])
]);