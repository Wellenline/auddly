import { ChangeDetectionStrategy, Component, Inject, InjectionToken, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { slideInOutAnimation } from 'src/app/animations/slide-in-out';
import { trigger, transition, style, animate } from '@angular/animations';
export type TooltipData = string | TemplateRef<void>;
export const TOOLTIP_DATA = new InjectionToken<TooltipData>('Data to display in tooltip');
@Component({
	selector: 'app-tooltip',
	standalone: true,
	animations: [
		slideInOutAnimation
	],
	imports: [OverlayModule, CommonModule],
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
	get asString(): string | false {
		return typeof this.tooltipData === 'string' ? this.tooltipData : false;
	}

	get asTemplate(): TemplateRef<void> | false {
		return this.tooltipData instanceof TemplateRef ? this.tooltipData : false;
	}

	constructor(@Inject(TOOLTIP_DATA) public tooltipData: TooltipData) { }

	ngOnInit() {
		//console.log("tooltip visible");

	}

	ngOnDestroy() {
		//console.log("tooltip hidden");
	}
}
