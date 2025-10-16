import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ collection: 'tbl_users' })
export class User extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  middlename: string;

  @Prop({ required: true, unique: true })
  emailaddress: string;

  @Prop()
  DateTimeEntered: string;

  @Prop({ default: 0 })
  IsPGAS: number;

  @Prop()
  pgasID: number;

  @Prop({ default: 1 })
  IsActive: number;

  @Prop({ required: true })
  UserType: number;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);

UserSchema.pre('save', async function (next) {
  const user = this as any;
  if (user.IsPGAS === 1) {
    return next();
  }

  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err as any);
  }
});