import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

// ENUMS
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';

// INTERFACES
import { UserRepositoryInterface } from '../database/interfaces/user-repository.interface';
import { AuthServiceInterface } from './interfaces/auth-service.interface';

// SCHEMAS
import { User } from '../database/schemas/user.schema';

// DTOS
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService implements AuthServiceInterface {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		@Inject(DatabaseProviderEnum.USER_REPOSITORY)
		private readonly userRepository: UserRepositoryInterface,
		private readonly jwtService: JwtService,
	) {}

	public async register(data: CreateUserDTO): Promise<User> {
		this.logger.log(`register`);

		const user = await this.userRepository.model.create(data);

		delete user.password;

		return user;
	}

	public async doLogin(data: LoginDTO): Promise<string> {
		this.logger.log(`doLogin`);

		const user = await this.userRepository.model.findOne({
			email: data.email,
		});

		if (!user) {
			this.logger.error(`User not found`);
			throw new BadRequestException('Credenciais inválidas');
		}

		if (!compareSync(data.password, user.password)) {
			this.logger.error(`invalid credentials`);
			throw new BadRequestException('Credenciais inválidas');
		}

		const token = this.jwtService.sign({
			id: user.id,
			email: user.email,
			userName: user.userName,
		});

		return token;
	}
}
