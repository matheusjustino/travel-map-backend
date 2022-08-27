// SCHEMAS
import { User } from './../../database/schemas/user.schema';

export interface UserServiceInterface {
	getMe(userId: string): Promise<User>;
}
