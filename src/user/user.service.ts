import { Inject, Injectable } from '@nestjs/common';

// ENUMS
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';

// INTERFACES
import { UserServiceInterface } from './interfaces/user-service.interface';
import { UserRepositoryInterface } from '../database/interfaces/user-repository.interface';

// SCHEMAS
import { User } from './../database/schemas/user.schema';

@Injectable()
export class UserService implements UserServiceInterface {
	constructor(
		@Inject(DatabaseProviderEnum.USER_REPOSITORY)
		private readonly userRepository: UserRepositoryInterface,
	) {}

	public async getMe(userId: string): Promise<User> {
		return this.userRepository.model.findById(userId);
	}
}
