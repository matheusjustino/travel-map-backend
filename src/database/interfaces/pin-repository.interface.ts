import { Model } from 'mongoose';

// SCH
import { PinDocument } from '../schemas/pin.schema';

export interface PinRepositoryInterface {
	model: Model<PinDocument>;
}
