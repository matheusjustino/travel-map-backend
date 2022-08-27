import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { AppResolver } from './app.resolver';

import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PinModule } from './pin/pin.module';

@Module({
	imports: [
		AppConfigModule,
		GraphQLModule.forRoot({
			cors: {
				origin: '*', //process.env.FRONTEND_URLS.split(';'),
				credentials: true,
			},
			driver: ApolloDriver,
			debug: true,
			playground: true,
			autoSchemaFile: true,
			useGlobalPrefix: true,
			context: ({ req }) => ({ headers: req.headers }),
			formatError: (error) => {
				Logger.error(JSON.stringify(error));

				const graphQLFormattedError = {
					message:
						error?.extensions?.exception?.detail ||
						error?.extensions?.exception?.response?.message ||
						error?.message,
					code: error?.extensions?.code,
				};
				return graphQLFormattedError;
			},
		}),
		DatabaseModule,
		AuthModule,
		UserModule,
		PinModule,
	],
	providers: [AppResolver],
})
export class AppModule {}
