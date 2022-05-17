import { animation, style, animate, keyframes } from '@angular/animations';

export const DEFAULT_TIMING = '0.5';

export const bounceIn = animation(
	animate(
		'{{ timing }}s {{ delay }}s cubic-bezier(0.17, 0.89, 0.24, 1.11)',
		keyframes([
			style({
				opacity: 0,
				transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)',
				offset: 0,
			}),
			style({
				opacity: 1,
				transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
				offset: 0.6,
			}),
			style({
				opacity: 1,
				transform: 'scale3d(1, 1, 1) translate3d(0,0,0)',
				offset: 1,
			}),
		])
	),
	{ params: { timing: DEFAULT_TIMING, delay: 0 } }
);

export const bounceOut = animation(
	animate(
		'{{ timing }}s {{ delay }}s cubic-bezier(0.6, 0.72, 0, 1)',
		keyframes([
			style({
				opacity: 1,
				transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
				offset: 0.3,
			}),
			style({
				opacity: 0,
				transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 500px, 0)',
				offset: 1,
			}),
		])
	),
	{ params: { timing: DEFAULT_TIMING, delay: 0 } }
);