import { AsyncModelFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

// SCHEMAS
import { User, UserSchema, UserDocument } from './schemas/user.schema';
import { Pin, PinSchema } from './schemas/pin.schema';

export const SchemaProvider: AsyncModelFactory[] = [
	{
		name: User.name,
		collection: 'users',
		useFactory: () => {
			const schema = UserSchema;
			schema.pre<UserDocument>('save', async function (next) {
				if (!this.isModified('password')) next();

				const salt = await bcrypt.genSalt(12);
				const hash = await bcrypt.hash(this.password, salt);
				this.password = hash;
				next();
			});

			return schema;
		},
	},
	{
		name: Pin.name,
		collection: 'pins',
		useFactory: () => PinSchema,
	},
];
