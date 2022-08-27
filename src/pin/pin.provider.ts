import { Provider } from '@nestjs/common';

// ENUMS
import { PinProviderEnum } from './enums/pin-provider.enum';

// SERVICES
import { PinService } from './pin.service';

export const PinProvider: Provider[] = [
	{
		provide: PinProviderEnum.PIN_SERVICE,
		useClass: PinService,
	},
];
