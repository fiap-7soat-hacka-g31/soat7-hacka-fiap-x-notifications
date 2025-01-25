import { StorageModule } from '@fiap-x/storage';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipientRepository } from '../application/abstractions/recipient.repository';
import { MongooseRecipientSchemaFactory } from './persistence/mongoose/recipient-schema.factory';
import { MongooseRecipientRepository } from './persistence/mongoose/recipient.repository';
import {
  MongooseRecipientSchema,
  MongooseRecipientSchemaModel,
} from './persistence/mongoose/recipient.schema';

const MongooseSchemaModule = MongooseModule.forFeature([
  {
    name: MongooseRecipientSchema.name,
    schema: MongooseRecipientSchemaModel,
  },
]);

MongooseSchemaModule.global = true;

@Module({
  imports: [StorageModule, MongooseSchemaModule],
  providers: [
    MongooseRecipientSchemaFactory,
    {
      provide: RecipientRepository,
      useClass: MongooseRecipientRepository,
    },
  ],
  exports: [RecipientRepository],
})
export class InfraModule {}
