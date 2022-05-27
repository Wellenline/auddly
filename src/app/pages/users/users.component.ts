import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { UserFormComponent } from 'src/app/overlays/user-form/user-form.component';
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

	public loading = true;
	constructor(private httpService: HttpService, private toastService: ToastService, private router: Router, private route: ActivatedRoute, private modalService: ModalService) { }

	ngOnInit(): void {
		this.getUsers();
		this.route.queryParams.subscribe((params) => {
			if (params.id) {
				this.onEditUser(params.id);

			}
		});

	}

	public onEditUser(id?) {
		const index = this.users.data.findIndex(category => category._id === id);

		this.modalService.show({
			component: UserFormComponent,
			params: {
				id,
			},

			callback: (data) => {
				this.router.navigate([], {
					queryParams: {
						'id': null,
					},
					replaceUrl: false,
					queryParamsHandling: 'merge'
				})
				if (data) {

					this.toastService.show({
						message: "User updated",
					})

					this.getUsers();
				}
			}
		})
	}

	onCreate() {
		this.modalService.show({
			component: UserFormComponent,
			callback: (data) => {
				if (data) {
					this.toastService.show({
						message: "User created",
					})
				}
			}
		});
	}

	getUsers() {
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

	public onCopy(code) {
		const el = document.createElement("textarea");
		el.value = `${this.httpService.API_ENDPOINT}/auth/signup?join=${code}`;
		el.setAttribute("readonly", "");
		el.style.position = "absolute";
		el.style.left = "-9999px";
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		this.toastService.show({
			message: "Copied to clipboard",
		});
		// this.interfaceService.notify("Link copied to clipboard", { timeout: 3000 });

	}

}

