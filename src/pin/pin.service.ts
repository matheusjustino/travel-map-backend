import { Inject, Injectable, Logger } from '@nestjs/common';

// ENUMS
import { DatabaseProviderEnum } from './../database/enums/database-provider.enum';

// SCHEMAS
import { Pin } from '../database/schemas/pin.schema';

// DTOS
import { CreatePinDTO } from './dtos/create-pin.dto';

// INTERFACES
import { PinServiceInterface } from './interfaces/pin-service.interface';
import { PinRepositoryInterface } from './../database/interfaces/pin-repository.interface';

@Injectable()
export class PinService implements PinServiceInterface {
	private readonly logger: Logger = new Logger(PinService.name);

	constructor(
		@Inject(DatabaseProviderEnum.PIN_REPOSITORY)
		private readonly pinRepository: PinRepositoryInterface,
	) {}

	public async createPin(userId: string, data: CreatePinDTO): Promise<Pin> {
		this.logger.log(`createPin`);

		const pin = await this.pinRepository.model.create({
			...data,
			user: userId,
		});

		return pin.populate('user');
	}

	public async listPins(): Promise<Pin[]> {
		this.logger.log(`listPins`);

		return this.pinRepository.model.find().populate('user').exec();
	}
}
