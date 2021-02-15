import { makeTest } from '../../../setup/setup';
import { StoreController } from '../../controllers/StoreController';
import { newOrder } from '../../data/StoreFactory';
import { Response } from '../../../client/CustomResponse';
import { Order } from '../../controllers/types';

import { SwaggerCheck } from '../../../utils/SwaggerCheck';

makeTest('Contract Store Controller', () => {
	let storeController: StoreController;
	let order: Order;
	let swagger: SwaggerCheck;

	beforeAll(() => {
		storeController = new StoreController('http://localhost:8080/api/v3');
		swagger = new SwaggerCheck('./openapiswagger.yml');
	});

	test('Add new Order - 200 OK', async () => {
		order = newOrder();
		const response: Response = await storeController.place_an_order(order);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/store/order', 'post', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});

	test('Get inventories by status - 200 OK', async () => {
		const response: Response = await storeController.inventories_by_status();
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/store/inventory', 'get', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});

	test('Find purcharse order by id - 200 OK', async () => {
		const response: Response = await storeController.find_purcharse_order_by_id(order.id);
		const responseBody = JSON.parse(response.body);
		const swaggerErrors = swagger.validateSchema('/store/order/{orderId}', 'get', response.statusCode, responseBody);
		expect(response.statusCode).toEqual(200);
		expect(swaggerErrors.length === 0).toBeTruthy();
	});

	test('Find purcharse order by id - 404 not found', async () => {
		const response: Response = await storeController.find_purcharse_order_by_id(99999999);
		const responseBody = JSON.parse(JSON.stringify(response));
		expect(responseBody.message).toEqual('Response code 404 (Not Found)');
		expect(response.statusCode).toEqual(404);
	});

	test('Delete purcharse order by id - 200 OK', async () => {
		const response: Response = await storeController.delete_purcharse_order_by_id(order.id);
		expect(response.statusCode).toEqual(200);
	});
});
