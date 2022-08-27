// SCHEMAS
import { Pin } from '../../database/schemas/pin.schema';

// DTOS
import { CreatePinDTO } from '../dtos/create-pin.dto';

export interface PinServiceInterface {
	createPin(userId: string, data: CreatePinDTO): Promise<Pin>;
	listPins(): Promise<Pin[]>;
}
