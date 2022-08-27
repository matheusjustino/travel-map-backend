import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
	@Field(() => ID)
	public id: string;

	@Field(() => String)
	public userName: string;

	@Field(() => String)
	public email: string;

	@Field(() => String)
	public password: string;

	@Field()
	public createdAt: Date;

	@Field()
	public updatedAt: Date;
}
