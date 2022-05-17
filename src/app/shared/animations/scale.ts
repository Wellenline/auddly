import {
	transition,
	style,
	animate,
	trigger,
	stagger,
	query,
	animation,
} from '@angular/animations';

export const ScaleFade = trigger('scaleFade', [
	transition(
		':enter',
		animation([
			style({ opacity: 0, transform: 'scale(0.8, 0.8)' }),
			animate(
				'0.3s ease-in-out',
				style({ opacity: 1, transform: 'scale(1, 1)' })
			),
		])
	),
	transition(
		':leave',
		animation([
			animate(
				'0.3s ease-in-out',
				style({
					opacity: 0,
					transform: 'scale(0.8, 0.8)',
				})
			),
		])
	),
]);

export const ScaleFadeStagger = trigger('scaleFadeStagger', [
	transition(':enter', [
		query(
			':enter',
			[
				style({ opacity: 0, transform: 'scale(0.8, 0.8)' }),
				stagger('50ms', [
					animate(
						'300ms 300ms',
						style({ opacity: 1, transform: 'scale(1, 1)' })
					),
				]),
			],
			{ optional: true }
		),
	]),
	transition(':leave', [
		query(
			':leave',
			[
				stagger('50ms', [
					animate('300ms', style({ opacity: 0, transform: 'scale(0.8, 0.8)' })),
				]),
			],
			{ optional: true }
		),
	]),
]);