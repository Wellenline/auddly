import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, Portal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { IModalConfig } from '../modal/modal-config';
import { ModalConfig, ModalRef } from './sidebar.service';
import { SlideFadeLeft } from 'src/app/animations/slide';


@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	animations: [SlideFadeLeft],
	standalone: true,
	imports: [CommonModule, PortalModule],
})
export class SidebarComponent implements OnInit {
	public visible = false;

	public portal!: Portal<any>;
	public params: any;
	constructor(
		@Inject(ModalConfig) public modal: IModalConfig,
		@Inject(ModalRef) public ref: OverlayRef) { }

	ngOnInit(): void {
		console.log("sidebar", this.modal)
		this.visible = true;
		this.params = this.modal.params || {};
		this.portal = new ComponentPortal(this.modal.component);
	}

	public onClose(callback?: any) {
		this.visible = false;

		if (this.modal.callback) {
			this.modal.callback(callback);
		}

		setTimeout(() => {

			this.ref.detach();
			this.ref.dispose();
		}, 300)

	}

	ngOnDestroy() {
		// this.snackbarSubscription.unsubscribe();
	}
}
