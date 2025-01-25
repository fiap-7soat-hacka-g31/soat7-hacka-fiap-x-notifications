import { MongooseEntitySchema } from '@fiap-x/tactical-design/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Recipients', timestamps: true })
export class MongooseRecipientSchema extends MongooseEntitySchema {
  @Prop()
  externalId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const MongooseRecipientSchemaModel = SchemaFactory.createForClass(
  MongooseRecipientSchema,
);

MongooseRecipientSchemaModel.index({ externalId: 1 }, { unique: true });
