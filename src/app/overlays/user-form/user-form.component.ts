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
	public uploading = false;
	public error: string;
	public roles = [];
	constructor(private httpService: HttpService, public modalComponent: ModalComponent, private route: ActivatedRoute) { }

	ngOnInit(): void {
		// get user
		if (this.modalComponent.params.id) {
			this.getRoles();
			this.getUser(this.modalComponent.params.id);
		} else {
			this.loading = false;
			this.user = {};
		}

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

	public uploadFile(event) {
		const file = event.target.files[0];
		if (this.uploading || !file) {
			return;
		}

		this.uploading = true;
		const mimeType = file.type;
		if (mimeType.match(/image\/*/) === null) {
			return;
		}

		const formData: FormData = new FormData();
		formData.append("file", file, file.name);
		formData.append("type", "image");
		formData.append("folder", "profile-pictures");
		console.log(file)

		this.httpService.upload("/upload", formData).subscribe((response: any) => {
			console.log(response);
			this.user.picture = response.link;
			this.uploading = false;
		});
	}

	public onSave() {
		this.error = "";
		this.loading = true;
		this.httpService.put(`/users/${this.user._id}`, this.user).subscribe((response) => {
			this.modalComponent.onClose(response);
		}, (err) => {
			this.error = err;
		}).add(() => this.loading = false);
	}

	onClose() {
		// reset invites
		this.modalComponent.onClose();
	}
}
