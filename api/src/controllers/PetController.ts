import { ApiController } from '../../client/ApiController';
import { Response } from '../../client/CustomResponse';
import { Pet } from './types';
import * as fs from 'fs';

class PetController extends ApiController {
	constructor(baseUrl: string) {
		super(baseUrl);
	}

	update_an_existing(body: Pet): Promise<Response> {
		return super.put('/pet', body);
	}

	add_a_new(body: Pet): Promise<Response> {
		return super.post('/pet', body);
	}

	find_by_status(status: string): Promise<Response> {
		return super.get(`/pet/findByStatus?status=${status}`);
	}

	find_by_tags(_tags: string[]): Promise<Response> {
		const tags = _tags.map((tag) => `tags=${tag}`).join('&');
		return super.get(`/pet/findByTags?${tags}`);
	}

	find_by_id(petId: number): Promise<Response> {
		return super.get(`/pet/${petId}`);
	}

	update_an_existing_by_form(petId: number, form: Record<string, unknown>): Promise<Response> {
		const query: string = Object.keys(form)
			.map((key) => `${key}=${form[key]}`)
			.join('&');
		return super.post(`/pet/${petId}?${query}`, '');
	}

	delete_by_id(petId: number): Promise<Response> {
		return super.delete(`/pet/${petId}`);
	}

	upload_image(petId: number, imagePath: string, _additionalMetadata?: string): Promise<Response> {
		const additionalMetadata = _additionalMetadata ? `?additionalMetadata=${_additionalMetadata}` : '';
		const body = fs.readFileSync(imagePath);
		const headers = {
			accept: 'application/json',
			'Content-Type': 'application/octet-stream',
			'user-agent': 'automaticTest',
		};
		return super.post(`/pet/${petId}${additionalMetadata}`, body, headers);
	}
}

export { PetController };
