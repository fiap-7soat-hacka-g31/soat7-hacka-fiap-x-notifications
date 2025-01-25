import {
  AggregateMergeContext,
  TransactionManager,
} from '@fiap-x/tactical-design/core';
import { MongooseRepository } from '@fiap-x/tactical-design/mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipientRepository } from '../../../application/abstractions/recipient.repository';
import { Recipient } from '../../../domain/entities/recipient.entity';
import { MongooseRecipientSchemaFactory } from './recipient-schema.factory';
import { MongooseRecipientSchema } from './recipient.schema';

export class MongooseRecipientRepository
  extends MongooseRepository<MongooseRecipientSchema, Recipient>
  implements RecipientRepository
{
  constructor(
    protected readonly transactionManager: TransactionManager,
    @InjectModel(MongooseRecipientSchema.name)
    protected readonly Model: Model<MongooseRecipientSchema>,
    protected readonly schemaFactory: MongooseRecipientSchemaFactory,
    protected readonly mergeContext: AggregateMergeContext,
  ) {
    super(mergeContext, transactionManager, Model, schemaFactory);
  }

  /* istanbul ignore next */
  async findByExternalId(externalId: string): Promise<Recipient> {
    return this.findOne({ externalId });
  }
}
