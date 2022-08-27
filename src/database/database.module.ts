import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// DATABASE PROVIDER
import { DatabaseProvider } from './database.provider';

// SCHEMA PROVIDER
import { SchemaProvider } from './schema.provider';

@Global()
@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: process.env.MONGO_DB_URI,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}),
		}),
		MongooseModule.forFeatureAsync(SchemaProvider),
	],
	providers: DatabaseProvider,
	exports: DatabaseProvider,
})
export class DatabaseModule {}
