import {
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

// ENUMS
import { DatabaseProviderEnum } from '../../database/enums/database-provider.enum';

// INTERFACES
import { UserRepositoryInterface } from '../../database/interfaces/user-repository.interface';
import { TokenLoginDataInterface } from '../interfaces/token-login-data.interface';
import { DecodedToken } from '../interfaces/decoded-token.interface';

@Injectable()
export class GqlJWTGuard extends AuthGuard('jwt') {
	private readonly logger: Logger = new Logger(GqlJWTGuard.name);

	constructor(
		@Inject(DatabaseProviderEnum.USER_REPOSITORY)
		private readonly userRepository: UserRepositoryInterface,
		private readonly jwtService: JwtService,
	) {
		super();
	}

	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		this.logger.log('canActivate');

		const gqlCtx = GqlExecutionContext.create(context);
		const ctx = gqlCtx.getContext();

		if (!ctx.headers.authorization) {
			this.logger.error('No authorization header');
			throw new ForbiddenException('Token Inválido');
		}

		const [, token]: [string, string] =
			ctx.headers.authorization.split(' ');

		if (!token) {
			this.logger.error('No token provide');
			throw new ForbiddenException('Token Inválido');
		}

		try {
			const payload = this.validateToken(token);
			ctx.req.user = payload;
		} catch (error) {
			throw new ForbiddenException('Token Expirado');
		}

		return true;
	}

	private validateToken(token: string): TokenLoginDataInterface {
		this.logger.log('validateToken');

		const verifiedToken = this.jwtService.verify(token, {
			secret: process.env.SECRET,
		}) as DecodedToken;

		return {
			id: verifiedToken.id,
			email: verifiedToken.email,
			userName: verifiedToken.userName,
		};
	}
}
