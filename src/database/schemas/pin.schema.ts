import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// SCHEMAS
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Pin {
	@Prop({ type: Types.ObjectId, ref: User.name })
	public user: User;

	@Prop({ type: String })
	public title: string;

	@Prop({ type: String })
	public description: string;

	@Prop({ type: Number })
	public rating: number;

	@Prop({ type: Number })
	public lat: number;

	@Prop({ type: Number })
	public long: number;
}

export type PinDocument = Pin & Document;
export const PinSchema = SchemaFactory.createForClass(Pin);
