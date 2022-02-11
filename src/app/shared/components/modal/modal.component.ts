import { trigger, transition, query, style, group, animate, animateChild } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, ComponentType, Portal, PortalOutlet } from '@angular/cdk/portal';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { slideUpDownAnimation } from '../../animations/slide-up-down';
import { IModalConfig } from './modal-config';
import { ModalConfig, ModalRef } from './modal.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	animations: [slideUpDownAnimation]
})
export class ModalComponent implements OnInit {
	public visible = false;

	public portal: Portal<any>;
	public params: any;
	constructor(
		@Inject(ModalConfig) public modal: IModalConfig,
		@Inject(ModalRef) public ref: OverlayRef) { }

	ngOnInit(): void {
		this.visible = true;
		this.params = this.modal.params || {};
		this.portal = new ComponentPortal(this.modal.component);
	}

	public onClose(callback?: any) {
		this.visible = false;


		if (this.modal.callback) {
			this.modal.callback(callback);
		}

		this.ref.detach();
		this.ref.dispose();
	}

	ngOnDestroy() {
		// this.snackbarSubscription.unsubscribe();
	}
}

