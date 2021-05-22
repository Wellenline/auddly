import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { InterfaceService } from "../modules/shared/services/interface.service";

@Injectable({
	providedIn: "root"
})
export class UpdateService {
	constructor(private swUpdate: SwUpdate, private interfaceService: InterfaceService) {
		console.log("Subscribing to app updates");
		this.swUpdate.available.subscribe((evt) => {
			this.interfaceService.dialog.show({
				type: "confirm",
				okButtonText: "Reload",
				cancelButtonText: "Cancel",
				title: "New Version",
				message: "There's a new update available",
				closed: (success) => {
					if (success) {
						window.location.reload();

					}
				},
			});
		});
	}
}
