import { GqlJWTGuard } from './guards/gql-jwt.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// ENUMS
import { AuthProviderEnum } from './enums/auth-provider.enum';

// INTERFACES
import { AuthServiceInterface } from './interfaces/auth-service.interface';

// DTOS
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';
import { UserDTO } from './dtos/user.dto';

@Resolver()
export class AuthResolver {
	constructor(
		@Inject(AuthProviderEnum.AUTH_SERVICE)
		private readonly authService: AuthServiceInterface,
	) {}

	@Mutation(() => UserDTO)
	public async register(@Args('input') input: CreateUserDTO) {
		return this.authService.register(input);
	}

	@Mutation(() => String)
	public async doLogin(@Args('input') input: LoginDTO) {
		return this.authService.doLogin(input);
	}

	@Query(() => String)
	@UseGuards(GqlJWTGuard)
	public testGuard() {
		return 'guard working';
	}
}
