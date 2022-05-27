

import {
	transition,
	style,
	animate,
	trigger,
	useAnimation,
	animation,
} from "@angular/animations";

export const SlideEnterAnimation = animation([
	style({ transform: "translate({{ x }}, {{ y }})" }),
	animate(
		"{{ duration }} cubic-bezier(0.59, 0.32, 0.38, 1.13)",
		style({ transform: "translate(0)" })
	),
]);

export const SlideExitAnimation = animation([
	style({ transform: "translate(0)" }),
	animate(
		"{{ duration }} cubic-bezier(0.59, 0.32, 0.38, 1.13)",
		style({ transform: "translate({{ x }}, {{ y }})" })
	),
]);

// export const SlideToCart = trigger('slideToCart', [
//   transition(
//     ':enter',
//    animate('300ms', style({
//      transform: 'translate('
//    }))
//   ),
//   // transition(
//   //   ':leave',
//   //   useAnimation(SlideExitAnimation, {
//   //     params: { x: `-${window.innerWidth}px`, y: 0, duration: '0.5s' },
//   //   })
//   // ),
// ]);

export const SlideLeft = trigger("slideLeft", [
	transition(
		":enter",
		useAnimation(SlideEnterAnimation, {
			params: { x: `-${window.innerWidth}px`, y: 0, duration: "0.5s" },
		})
	),
	transition(
		":leave",
		useAnimation(SlideExitAnimation, {
			params: { x: `-${window.innerWidth}px`, y: 0, duration: "0.5s" },
		})
	),
]);

export const SlideRight = trigger("slideRight", [
	transition(
		":enter",
		useAnimation(SlideEnterAnimation, {
			params: { x: `${window.innerWidth}px`, y: 0, duration: "0.5s" },
		})
	),
	transition(
		":leave",
		useAnimation(SlideExitAnimation, {
			params: { x: `${window.innerWidth}px`, y: 0, duration: "0.5s" },
		})
	),
]);

export const SlideFadeLeft = trigger("slideFadeLeft", [
	transition(
		":enter",
		animation([
			style({ opacity: 0, height: 0, transform: "translate(100px, 0)" }),
			animate(
				"0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)",
				style({ opacity: 1, height: "*", transform: "translate(0, 0)" })
			),
		])
	),
	transition(
		":leave",
		animation([
			animate(
				"0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)",
				style({ opacity: 0, height: 0, transform: "translate(100px, 0)" })
			),
		])
	),
]);