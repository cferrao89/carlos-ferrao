import { ApiController } from '../../client/ApiController';
import { Response } from '../../client/CustomResponse';
import { Order } from './types';

class StoreController extends ApiController {
	constructor(baseUrl: string) {
		super(baseUrl);
	}

	inventories_by_status(): Promise<Response> {
		return super.get('/store/inventory');
	}

	place_an_order(body: Order): Promise<Response> {
		return super.post('/store/order', body);
	}

	find_purcharse_order_by_id(orderId: number): Promise<Response> {
		return super.get(`/store/order/${orderId}`);
	}

	delete_purcharse_order_by_id(orderId: number): Promise<Response> {
		return super.delete(`/store/order/${orderId}`);
	}
}

export { StoreController };
