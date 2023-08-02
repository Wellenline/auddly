import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { config, IConfig } from './config';
const _config = {
	// tslint:disable-next-line:max-line-length
	svg: `	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style='enable-background: new 0 0 50 50;' xmlSpace="preserve">
	<path fill="var(--accent-color)" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(360 -4.05439e-8 -4.05439e-8)">
		<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
	</path>
</svg>`,
	loaderStyles: {
		'position': 'absolute',
		'left': '0',
		'right': '0',
		'top': '0',
		'bottom': '0',
		'background': 'var(--background-color)',
		'z-index': '50',
		'display': 'flex',
		'flex-direction': 'column',
		'justify-content': 'center',
		'align-items': 'center',
	},

	hostStyles: {
		'position': 'relative'
	},
	messageStyles: {
		'text-align': 'center',
		'color': 'var(--accent-color)',
		'font-size': '13px',
	},
	rotate: {
		iterations: Infinity
	}
};

@Directive({
	selector: '[appLoader]',
	standalone: true,
})
export class LoaderDirective {
	@Input()
	public message: string;

	@Input()
	public set loading(value: boolean) {
		if (!value) {
			this.loaderEl ? this._setStyles(this.loaderEl, { display: 'none' }) : null;
			return;
		}

		this.loaderEl = this._renderer.createElement('div');

		this._renderer.appendChild(this._el.nativeElement, this.loaderEl);
		const svg = new DOMParser().parseFromString(this.svg as string, "text/xml").documentElement;
		this._renderer.appendChild(this.loaderEl, svg);
		console.log('has message', this.message)

		setTimeout(() => {
			if (this.message) {
				const message = this._renderer.createElement('div') as HTMLDivElement;
				message.className = 'loader-message';

				this._renderer.appendChild(this.loaderEl, message);
				console.log('has message', this.message)
				this._renderer.appendChild(message, this._renderer.createText(this.message));

			}
		}, 100);

		this._setStyles(this._el.nativeElement, this.hostStyles as any);
		this._setStyles(this.loaderEl, this.loaderStyles as any);

	}

	@Input()
	public set background(value) {
		//this.loaderStyles['background'] = value || 'var(--background-color-4)';
		//this._setStyles(this.loaderEl, this.loaderStyles as any);
	}

	public loaderEl!: HTMLDivElement;
	public loaderStyles: IConfig['loaderStyles'];
	public imgStyles: IConfig['imgStyles'];
	public hostStyles: IConfig['hostStyles'];
	public messageStyles: IConfig['messageStyles'];
	public img: IConfig['img'];
	public rotateAnimaitioan: IConfig['rotate'];
	public svg;
	public constructor(
		private _el: ElementRef,
		private _renderer: Renderer2
	) {
		this.loaderStyles = _config.loaderStyles;
		this.hostStyles = _config.hostStyles;
		this.svg = _config.svg;
		this.rotateAnimaitioan = _config.rotate;
	}

	private _setStyles(element: HTMLElement, styles: { [key: string]: string }): void {
		Object.keys(styles).forEach((key: any) => {
			this._renderer?.setStyle(element, key, styles[key]);


		});
	}

}

