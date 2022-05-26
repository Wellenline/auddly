

export interface Industry {
	id: number;
	image_url: string;
	name: string;
}

export interface Language {
	id: number;
	image_url: string;
	name: string;
}

export interface Lifestyle {
	id: number;
	image_url: string;
	name: string;
}

export interface Personality {
	id: number;
	image_url: string;
	name: string;
}

export interface Country {
	id: number;
	image_url: string;
	name: string;
}

export interface Address {
	city: string;
	latitude: number;
	longitude: number;
}

export interface Rating {
	average: number;
	total_reviews: number;
}

export interface IUserLimited {
	id: number;
	first_name: string;
	image_url: string;
	is_verified: boolean;
}

export interface Favourited {
	address: Address;
	bathrooms: number;
	bedrooms: number;
	guests: number;
	id: number;
	image_url: string;
	is_favourited: boolean;
	purpose: string;
	rating: Rating;
	status: string;
	title: string;
	type: string;
	user: IUserLimited;
}

export interface IUser {
	age?: number;
	bio?: string;
	activated?: boolean;
	has_onboarded?: boolean;
	date_registered?: number;
	gender?: string;
	id?: number;
	image_url?: string;
	picture?: string;
	industry?: Industry | number;
	languages?: Language[] | number[];
	last_active_at?: string;
	lifestyles?: Lifestyle[] | number[];
	location?: string;
	first_name?: string;
	personalities?: Personality[] | number[];
	countries?: Country[] | number[];
	is_verified?: boolean;
	completed_percentage?: number;
	tokens?: number;
	subscription?: any;
	date_of_birth?: number;
	email?: string;
	is_age_hidden?: boolean;
	last_name?: string;
	favourited?: Favourited[];
	verifications?: any[];
	has_proposed_before?: boolean;
}


