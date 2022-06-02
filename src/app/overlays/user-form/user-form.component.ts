import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
	public user: any = {};
	public loading = false;
	public error: string;
	public roles = [];
	constructor(private httpService: HttpService, public modalComponent: ModalComponent, private route: ActivatedRoute) { }

	ngOnInit(): void {
		// get user
		if (this.modalComponent.params.id) {
			this.getUser(this.modalComponent.params.id);
		} else {
			this.loading = false;
			this.user = {};
		}

		this.getRoles();


	}

	getRoles() {
		this.httpService.get(`/roles`).subscribe((response: any) => {
			this.roles = response.data;
		})
	}

	public getUser(id: string) {
		this.httpService.get(`/users/${id}`).subscribe((response) => {
			this.user = response;
		});
	}


	public onSave() {
		this.error = "";
		this.loading = true;

		if (this.user._id) {
			this._onUpdate();
		}
		else {
			this._onCreate();
		}
	}


	private _onUpdate() {

		this.httpService.put(`/users/${this.user._id}`, this.user).subscribe((response) => {
			this.modalComponent.onClose(response);
		}, (err) => {
			this.error = err;
		}).add(() => this.loading = false);
	}

	private _onCreate() {


		this.httpService.post(`/users`, this.user).subscribe((response) => {
			this.modalComponent.onClose(response);
		}, (err) => {
			this.error = err;
		}).add(() => this.loading = false);
	}

}
