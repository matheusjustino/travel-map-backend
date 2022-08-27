import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePinDTO {
	// @Field(() => String)
	// public userId: string;

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
}
