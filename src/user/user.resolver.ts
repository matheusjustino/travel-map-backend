import { Resolver, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

// ENUMS
import { UserProviderEnum } from './enums/user-provider.enum';

// GUARDS
import { GqlJWTGuard } from '../auth/guards/gql-jwt.guard';

// DECORATORS
import { CurrentUser } from '../auth/decorators/user.decorator';

// SERVICES
import { UserServiceInterface } from './interfaces/user-service.interface';
import { UserRequestInterface } from '../auth/interfaces/user-request.interface';

// DTOS
import { UserDTO } from '../auth/dtos/user.dto';

@UseGuards(GqlJWTGuard)
@Resolver()
export class UserResolver {
	constructor(
		@Inject(UserProviderEnum.USER_SERVICE)
		private readonly userService: UserServiceInterface,
	) {}

	@Query(() => UserDTO)
	public async getMe(@CurrentUser() user: UserRequestInterface) {
		return this.userService.getMe(user.id);
	}
}
