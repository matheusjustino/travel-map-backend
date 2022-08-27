import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// ENUMS
import { PinProviderEnum } from './enums/pin-provider.enum';

// DECORATORS
import { CurrentUser } from '../auth/decorators/user.decorator';

// GUARDS
import { GqlJWTGuard } from '../auth/guards/gql-jwt.guard';

// INTERFACES
import { PinServiceInterface } from './interfaces/pin-service.interface';
import { UserRequestInterface } from '../auth/interfaces/user-request.interface';

// DTOS
import { CreatePinDTO } from './dtos/create-pin.dto';
import { PinDTO } from './dtos/pin.dto';

@Resolver()
export class PinResolver {
	constructor(
		@Inject(PinProviderEnum.PIN_SERVICE)
		private readonly pinService: PinServiceInterface,
	) {}

	@UseGuards(GqlJWTGuard)
	@Mutation(() => PinDTO)
	public async createPin(
		@CurrentUser() user: UserRequestInterface,
		@Args('input') input: CreatePinDTO,
	) {
		return this.pinService.createPin(user.id, input);
	}

	@Query(() => [PinDTO])
	public async listPins() {
		return this.pinService.listPins();
	}
}
