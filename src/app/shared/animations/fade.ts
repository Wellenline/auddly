import {
	transition,
	style,
	animate,
	trigger,
	animation,
} from '@angular/animations';

export const Fade = trigger('fade', [
	transition(
		':enter',
		animation([
			style({ opacity: 0 }),
			animate(
				'0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
				style({ opacity: 1 })
			),
		])
	),
	transition(
		':leave',
		animation([
			style({ opacity: 1 }),
			animate(
				'0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
				style({ opacity: 0 })
			),
		])
	),
]);