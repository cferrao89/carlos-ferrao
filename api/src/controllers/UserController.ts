import { ApiController } from '../../client/ApiController';
import { Response } from '../../client/CustomResponse';
import { User } from './types';

class UserController extends ApiController {
	constructor(baseUrl: string) {
		super(baseUrl);
	}

	create_user(body: User): Promise<Response> {
		return super.post('/user', body);
	}

	create_users_with_list(body: User[]): Promise<Response> {
		return super.post('/user/createWithList', body);
	}

	log_user(username: string, password: number): Promise<Response> {
		return super.get(`/user/login?username=${username}&password=${password}`);
	}

	logout_user(): Promise<Response> {
		return super.get('/user/logout');
	}

	get_user_by_username(username: string): Promise<Response> {
		return super.get(`/user/${username}`);
	}

	update_user(username: string, body: User): Promise<Response> {
		return super.put(`/user/${username}`, body);
	}

	delete_user_by_username(username: string): Promise<Response> {
		return super.delete(`/user/${username}`);
	}
}

export { UserController };
