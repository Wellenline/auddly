import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { UserFormComponent } from 'src/app/overlays/user-form/user-form.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	public users = {
		data: []
	}
	public user: any = {};
	public uploading = false;
	public error: string;
	public roles = [];
	public loading = true;
	constructor(private httpService: HttpService, private toastService: ToastService, private router: Router, public modalComponent: ModalComponent, private modalService: ModalService) { }

	ngOnInit(): void {
		this.getUsers();
	}

	public onEditUser(id?: string) {

		this.modalService.show({
			component: UserFormComponent,
			params: {
				id,
			},

			callback: (data) => {
				if (data) {

					this.toastService.show({
						message: "User updated",
					});

					this.getUsers();
				}
			}
		})
	}

	public onCreate() {
		this.modalService.show({
			component: UserFormComponent,
			callback: (data) => {
				if (data) {
					this.toastService.show({
						message: "User created",
					});

					this.getUsers();

				}
			}
		});
	}

	public getUsers() {
		this.httpService.get(`/users`).subscribe((response: any) => {
			this.users = response;
		}).add(() => {
			this.loading = false;
		});
	}

	public onDelete(item) {
		if (confirm("Are you sure you want to delete the user?")) {
			this.loading = true;
			this.httpService.delete(`/invites/${item._id}`).subscribe((response) => {
				this.getUsers();
			}, (err) => {
				this.loading = false;
				alert("Error deleting invite");
			});
		}
	}
}

