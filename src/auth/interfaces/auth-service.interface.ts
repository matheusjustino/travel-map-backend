// SCHEMAS
import { User } from '../../database/schemas/user.schema';

// DTOS
import { CreateUserDTO } from '../dtos/create-user.dto';
import { LoginDTO } from '../dtos/login.dto';

export interface AuthServiceInterface {
	register(data: CreateUserDTO): Promise<User>;
	doLogin(data: LoginDTO): Promise<string>;
}
