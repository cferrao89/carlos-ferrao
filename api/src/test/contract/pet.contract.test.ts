import { makeTest } from '../../../setup/setup';
import { PetController } from '../../controllers/PetController';
import { newPet } from '../../data/PetFactory';
import { Response } from '../../../client/CustomResponse';
import { Pet } from '../../controllers/types';

import { SwaggerCheck } from '../../../utils/SwaggerCheck';

makeTest('Contract pet Controller', () => {
	let petController: PetController;
	let pet: Pet;
	let swagger: SwaggerCheck;

	beforeAll(() => {
		petController = new PetController('http://localhost:8080/api/v3');
		swagger = new SwaggerCheck('./openapiswagger.yml');
	});

	test('Add new Pet - 200 OK', async () => {
		pet = newPet();
		const response: Response = await petController.add_a_new(pet);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/pet', 'post', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});

	test('Find Existing pet by id - 200 OK', async () => {
		const response: Response = await petController.find_by_id(pet.id);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/pet/{petId}', 'get', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});

	test('Find a non-existing pet - 404 not found', async () => {
		const response: Response = await petController.find_by_id(9999999);
		const responseBody = JSON.parse(JSON.stringify(response));
		expect(responseBody.message).toEqual('Response code 404 (Not Found)');
		expect(response.statusCode).toEqual(404);
	});

	test('Update Existing pet by id - 200 OK', async () => {
		pet.status = 'sold';
		const response: Response = await petController.update_an_existing(pet);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/pet', 'put', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});

	test('Find Updated pet by Status - 200 OK', async () => {
		const response: Response = await petController.find_by_status('sold');
		const responseBody = JSON.parse(response.body);
		expect(responseBody.every((p: Pet) => p.status === 'sold')).toBeTruthy();
		expect(response.statusCode).toEqual(200);
	});

	test('Find Pets by a non-existing Status - should return 400 - invalid status', async () => {
		const response: Response = await petController.find_by_status('nostatus');
		const responseBody = JSON.parse(JSON.stringify(response));
		expect(responseBody.message).toEqual('Input error: query parameter `status value `nostatus` is not in the allowable values `[available, pending, sold]`');
		expect(response.statusCode).toEqual(400);
	});

	test('Delete Existing pet by id - 200 OK', async () => {
		const response: Response = await petController.delete_by_id(pet.id);
		expect(response.statusCode).toEqual(200);
	});

	test('Update non-existing pet by id - 404 not found', async () => {
		pet.id = 999999;
		const response: Response = await petController.update_an_existing(pet);
		const responseBody = JSON.parse(JSON.stringify(response));
		expect(responseBody.message).toEqual('Response code 404 (Not Found)');
		expect(response.statusCode).toEqual(404);
	});
});
