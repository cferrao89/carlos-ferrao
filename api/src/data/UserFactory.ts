import { User } from '../controllers/types';
import faker from 'faker';

export function newUser(): User {
	return {
		id: faker.random.number(),
		username: faker.name.firstName(),
		firstName: 'John',
		lastName: 'James',
		email: 'john@email.com',
		password: 12345,
		phone: 12345,
		userStatus: 1,
	};
}

export function newUsersList(): User[] {
	return [
		{
			id: 10,
			username: 'theUser',
			firstName: 'John',
			lastName: 'James',
			email: 'john@email.com',
			password: 12345,
			phone: 12345,
			userStatus: 1,
		},
		{
			id: 11,
			username: 'theUser2',
			firstName: 'John2',
			lastName: 'James2',
			email: 'john2@email.com',
			password: 123452,
			phone: 123452,
			userStatus: 1,
		},
	];
}
