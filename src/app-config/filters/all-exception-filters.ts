import { Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionFilter.name);

	public catch(exception: any) {
		this.logger.error(exception);

		return exception;
	}
}
