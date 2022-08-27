import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// INTERFACES
import { PinRepositoryInterface } from '../interfaces/pin-repository.interface';

// SCHEMAS
import { Pin, PinDocument } from '../schemas/pin.schema';

@Injectable()
export class PinRepository implements PinRepositoryInterface {
	constructor(
		@InjectModel(Pin.name)
		private readonly PinModel: Model<PinDocument>,
	) {}

	public get model(): Model<PinDocument> {
		return this.PinModel;
	}
}
