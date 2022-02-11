import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { interval, Subscription } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class UpdateService {
	public updateSubscription: Subscription;

	constructor(public updates: SwUpdate) {
		this.checkForUpdate();
	}

	public checkForUpdate(): void {
		this.updateSubscription = this.updates.available.subscribe(event => this.promptUser());

		if (this.updates.isEnabled) {
			// Required to enable updates on Windows and ios.
			this.updates.activateUpdate();

			interval(60 * 60 * 100).subscribe(() => {
				this.updates.checkForUpdate().then(() => {
					// console.log("checking for updates");
				});
			});

		}
	}

	promptUser(): void {
		this.updates.activateUpdate().then(() => {
			window.location.reload();
		});
	}

}
