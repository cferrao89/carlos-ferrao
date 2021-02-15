import { makeTest } from '../../../setup/setup';
import { UserController } from '../../controllers/UserController';
import { newUser, newUsersList } from '../../data/UserFactory';
import { Response } from '../../../client/CustomResponse';
import { User } from '../../controllers/types';

import { SwaggerCheck } from '../../../utils/SwaggerCheck';

makeTest('E2E Store Controller', () => {
	let userController: UserController;
	let user: User;
	let users: User[];
	let swagger: SwaggerCheck;

	beforeAll(() => {
		userController = new UserController('http://localhost:8080/api/v3');
		swagger = new SwaggerCheck('./openapiswagger.yml');
	});

	test('Add new User - 200 OK - check swagger specification', async () => {
		user = newUser();
		const response: Response = await userController.create_user(user);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/user', 'post', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});

	test('Login with new User - 200 OK - check swagger specification', async () => {
		const response: Response = await userController.log_user(user.username, user.password);
		expect(response.body.includes('Logged in')).toBeTruthy();
		expect(response.statusCode).toEqual(200);
	});

	test('Logout with new User - 200 OK - check swagger specification', async () => {
		const response: Response = await userController.logout_user();
		expect(response.body.includes('logged out')).toBeTruthy();
		expect(response.statusCode).toEqual(200);
	});

	test('Get user by username - 200 OK - check swagger specification', async () => {
		const response: Response = await userController.get_user_by_username(user.username);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/user/{username}', 'get', response.statusCode, responseBody);
		expect(swaggerErrors.length === 0).toBeTruthy();
		expect(responseBody.username).toEqual(user.username);
		expect(responseBody.id).toEqual(user.id);
		expect(responseBody.firstName).toEqual(user.firstName);
		expect(responseBody.lastName).toEqual(user.lastName);
		expect(responseBody.phone.toString()).toEqual(user.phone.toString());
		expect(responseBody.email).toEqual(user.email);
		expect(responseBody.password.toString()).toEqual(user.password.toString());
		expect(responseBody.userStatus).toEqual(user.userStatus);
		expect(response.statusCode).toEqual(200);
	});

	test('Update user by username - 200 OK', async () => {
		user.email = 'email@email.com';
		user.firstName = 'firstName';
		user.phone = 111111111;
		const response: Response = await userController.update_user(user.username, user);
		const responseBody = JSON.parse(response.body);
		expect(responseBody.username).toEqual(user.username);
		expect(responseBody.id).toEqual(user.id);
		expect(responseBody.firstName).toEqual(user.firstName);
		expect(responseBody.lastName).toEqual(user.lastName);
		expect(responseBody.phone.toString()).toEqual(user.phone.toString());
		expect(responseBody.email).toEqual(user.email);
		expect(responseBody.password.toString()).toEqual(user.password.toString());
		expect(responseBody.userStatus).toEqual(user.userStatus);
		expect(response.statusCode).toEqual(200);
	});

	test('Delete user by username - 200 OK', async () => {
		const response: Response = await userController.delete_user_by_username(user.username);
		expect(response.statusCode).toEqual(200);
	});

	test('Get user by username - 404 Not Found', async () => {
		const response: Response = await userController.get_user_by_username(user.username);
		const responseBody = JSON.parse(JSON.stringify(response));
		expect(responseBody.message).toEqual('Response code 404 (Not Found)');
		expect(response.statusCode).toEqual(404);
	});

	test('Update user by non existing username - 404 Not Found', async () => {
		const response: Response = await userController.update_user(user.username, user);
		const responseBody = JSON.parse(JSON.stringify(response));
		expect(responseBody.message).toEqual('Response code 404 (Not Found)');
		expect(response.statusCode).toEqual(404);
	});

	test('Add new Users from list - 200 OK - check swagger specification', async () => {
		users = newUsersList();
		const response: Response = await userController.create_users_with_list(users);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/user/createWithList', 'post', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});
});
