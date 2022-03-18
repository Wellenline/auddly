import { OverlayConfig } from "@angular/cdk/overlay";
import { ComponentType } from "@angular/cdk/portal";
import { Subject } from "rxjs";

export interface IModalConfig {

	params?: any;
	component: ComponentType<any>;
	callback?: (data?: any) => void;
	class?: string;
	position?: string | "center" | "left" | "right";

}