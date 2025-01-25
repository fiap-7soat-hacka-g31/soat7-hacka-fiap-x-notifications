import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerSend } from 'mailersend';
import { MailerService } from '../application/abstractions/mailer.service';
import { RecipientRepository } from '../application/abstractions/recipient.repository';
import { MailerSendService } from './adapters/mailersend/mailersend.service';
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
  imports: [MongooseSchemaModule],
  providers: [
    MongooseRecipientSchemaFactory,
    {
      provide: RecipientRepository,
      useClass: MongooseRecipientRepository,
    },
    {
      provide: MailerSend,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new MailerSend({
          apiKey: config.getOrThrow('PROVIDER_MAILER_SEND_API_KEY'),
        }),
    },
    {
      provide: MailerService,
      useClass: MailerSendService,
    },
  ],
  exports: [RecipientRepository, MailerService],
})
export class InfraModule {}
