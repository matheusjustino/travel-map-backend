import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserDTO } from '../../auth/dtos/user.dto';

@ObjectType()
export class PinDTO {
	@Field(() => ID)
	public id: string;

	@Field(() => UserDTO)
	public user: UserDTO;

	@Field(() => String)
	public title: string;

	@Field(() => String)
	public description: string;

	@Field(() => Number)
	public rating: number;

	@Field(() => Number)
	public lat: number;

	@Field(() => Number)
	public long: number;

	@Field()
	public createdAt: Date;

	@Field()
	public updatedAt: Date;
}
