export interface ILoginResponse {
	id: string;
	token_type: string;
	expires_in: number;
	access_token: string;
	refresh_token: string;
}

export interface ILoginRequest {
	provider: string | "email";
	data: any;
}

export interface IForgotPasswordRequest {
	email: string;
}

export interface IConnectionRequest {
	endpoint: string;
}

export interface ISignupResponse {
	message: string;
}
