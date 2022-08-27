import { Module } from '@nestjs/common';

// RESOLVER
import { PinResolver } from './pin.resolver';

// PROVIDERS
import { PinProvider } from './pin.provider';

@Module({
	providers: PinProvider.concat(PinResolver),
	exports: PinProvider.concat(PinResolver),
})
export class PinModule {}
