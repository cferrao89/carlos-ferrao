import { Order } from '../controllers/types';

export function newOrder(): Order {
	return {
		id: 10,
		petId: 198772,
		quantity: 7,
		shipDate: '2021-02-10T03:54:58.376Z',
		status: 'approved',
		complete: true,
	};
}
