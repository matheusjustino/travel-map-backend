import { Module } from '@nestjs/common';

// PROVIDERS
import { UserProvider } from './user.provider';

// RESOLVERS
import { UserResolver } from './user.resolver';

@Module({
	providers: UserProvider.concat(UserResolver),
	exports: UserProvider.concat(UserResolver),
})
export class UserModule {}
