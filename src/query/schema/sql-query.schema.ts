import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SqlQuery extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  sql_query: string;

  @Prop({ required: true })
  connectionAlias: string;
}

export const SqlQuerySchema = SchemaFactory.createForClass(SqlQuery);
