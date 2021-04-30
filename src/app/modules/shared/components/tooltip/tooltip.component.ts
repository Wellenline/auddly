import { Component, OnInit } from "@angular/core";
import { InterfaceService } from "../../services/interface.service";

@Component({
	selector: "app-tooltip",
	templateUrl: "./tooltip.component.html",
	styleUrls: ["./tooltip.component.scss"]
})
export class TooltipComponent implements OnInit {
	tooltip: any;
	animationState: string = "active";

	constructor(private UI: InterfaceService) { }

	ngOnInit() {
		this.UI.tooltip$.subscribe(tooltip => {
			this.tooltip = tooltip;
		});
	}

	get tooltipPosition() {
		return {
			left: `${this.tooltip.dimensions.left}px`,
			width: `${this.tooltip.dimensions.right - this.tooltip.dimensions.left}px`,
			top: `${this.tooltip.dimensions.top + this.tooltip.dimensions.height}px`,
		};
	}

}
