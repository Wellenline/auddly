import { trigger, transition, query, style, animate } from "@angular/animations";

export const FadeAnimation = trigger('fadeAnimation', [
	transition('* => *', [
		query(
			':enter',
			[style({ opacity: 0 })],
			{ optional: true }
		),
		query(
			':leave',
			// here we apply a style and use the animate function to apply the style over 0.3 seconds
			[style({ opacity: 1, position: 'absolute', left: 0, right: 0, top: 0 }), animate('0.2s', style({ opacity: 0 }))],
			{ optional: true }
		),
		query(
			':enter',
			[style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
			{ optional: true }
		)
	])
])