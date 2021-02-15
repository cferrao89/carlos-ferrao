import { makeTest } from '../../setup/setup';
import { PetController } from '../controllers/PetController';
import { newPet } from '../data/PetFactory';
import { Response } from '../../client/CustomResponse';
import { Pet } from '../controllers/types';
import { SwaggerCheck } from '../../utils/SwaggerCheck';

makeTest('E2E pet Controller', () => {
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
		expect(response.statusCode).toEqual(200);
	});

	test('Update Existing pet by id - 200 OK', async () => {
		pet.status = 'sold';
		const response: Response = await petController.update_an_existing(pet);
		expect(response.statusCode).toEqual(200);
	});

	test('Find Updated pet by id - 200 OK', async () => {
		const response: Response = await petController.find_by_id(pet.id);
		const responseBody = JSON.parse(response.body);
		expect(responseBody.status).toEqual('sold');
		expect(response.statusCode).toEqual(200);
	});

	test('Find Updated pet by Status - 200 OK', async () => {
		const response: Response = await petController.find_by_status('sold');
		const responseBody = JSON.parse(response.body);
		expect(responseBody.every((p: Pet) => p.status === 'sold')).toBeTruthy();
		expect(response.statusCode).toEqual(200);
	});

	test('Find Updated pet by Tags - 200 OK', async () => {
		const response: Response = await petController.find_by_tags(['tag2']);
		const responseBody = JSON.parse(response.body);
		expect(
			responseBody.every((p: Pet) => {
				return p.tags.filter((tag) => tag.name === 'tag2').length > 0;
			})
		).toBeTruthy();
		expect(response.statusCode).toEqual(200);
	});

	test('Delete Existing pet by id - 200 OK', async () => {
		const response: Response = await petController.delete_by_id(pet.id);
		expect(response.statusCode).toEqual(200);
	});
});
