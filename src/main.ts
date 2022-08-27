import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import helmet from 'helmet';
import * as compression from 'compression';
import { json } from 'express';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './app-config/filters/all-exception-filters';

async function bootstrap() {
	const PORT = process.env.PORT || 8080;
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);

	app.enableCors({
		origin: process.env.FRONTEND_URLS.split(';'),
		credentials: true,
	});

	app.use(helmet());
	app.use(compression());
	app.use(json({ limit: '50mb' }));
	app.setGlobalPrefix('api');
	app.useGlobalFilters(new AllExceptionFilter());

	app.enableShutdownHooks();

	await app.listen(PORT, () => Logger.log(`App running on port: ${PORT}`));
}
bootstrap();
