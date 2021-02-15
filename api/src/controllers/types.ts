import { address } from 'faker';

export interface Pet {
	id: number;
	name?: string;
	category: Category;
	photoUrls?: string[];
	tags: Tags[];
	status: string;
}

export interface Category {
	id: number;
	name: string;
}

export interface Tags {
	id: number;
	name: string;
}

export interface Order {
	id: number;
	petId: number;
	quantity: number;
	shipDate: string;
	status: string;
	complete: boolean;
}

export interface Customer {
	id: number;
	username: string;
	address: Address;
}

export interface Address {
	street: string;
	city: string;
	state: string;
	zip: string;
}

export interface User {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: number;
	phone: number;
	userStatus: number;
}
