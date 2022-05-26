import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { IUser } from "../interfaces/user";
import { Cacheable } from "ts-cacheable";
import { AuthService } from "./auth.service";
import { HttpService } from "./http.service";

@Injectable({
	providedIn: "root"
})
export class UserService {

	private currentUserSubject = new BehaviorSubject<IUser>({} as IUser);
	public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

	public static cacheBuster$ = new Subject<void>();


	constructor(private httpService: HttpService) { }


	@Cacheable({
		cacheBusterObserver: UserService.cacheBuster$,
	})
	public getMe() {
		return this.httpService.get(`/users/me`).pipe(map(
			(response: IUser) => {
				this.currentUserSubject.next(response);
				return response;
			}));
	}

	// @Cacheable()
	public getProfile(id: string) {
		return this.httpService.get(`/users/${id}`);
	}

	public getUsers() {
		return this.httpService.get(`/users`);
	}

	public update(data: any) {
		return this.httpService.put(`/users/me`, data).pipe(map((response: IUser) => {
			// Update the currentUser observable
			this.currentUserSubject.next(response);
			return response;
		}));
	}


	public getCurrentUser(): IUser {
		return this.currentUserSubject.value;
	}

}
