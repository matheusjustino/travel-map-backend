import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDTO {
	@Field(() => String)
	public userName: string;

	@Field(() => String)
	public email: string;

	@Field(() => String)
	public password: string;
}
