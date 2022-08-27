import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// INTERFACES
import { UserRequestInterface } from '../interfaces/user-request.interface';

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): UserRequestInterface => {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req.user as UserRequestInterface;
	},
);
