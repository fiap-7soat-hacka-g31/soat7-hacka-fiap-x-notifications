import { EntitySchemaFactory } from '@fiap-x/tactical-design/core';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Recipient } from '../../../domain/entities/recipient.entity';
import { MongooseRecipientSchema } from './recipient.schema';

@Injectable()
export class MongooseRecipientSchemaFactory
  implements EntitySchemaFactory<MongooseRecipientSchema, Recipient>
{
  entityToSchema(entity: Recipient): MongooseRecipientSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      externalId: entity.externalId,
      name: entity.name,
      email: entity.email,
    };
  }

  schemaToEntity(entitySchema: MongooseRecipientSchema): Recipient {
    return new Recipient(
      entitySchema._id.toHexString(),
      entitySchema.externalId,
      entitySchema.name,
      entitySchema.email,
    );
  }
}
