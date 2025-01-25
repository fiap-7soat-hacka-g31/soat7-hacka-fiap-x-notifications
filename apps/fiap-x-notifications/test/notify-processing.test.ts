import { AmqpService } from '@fiap-x/amqp';
import { routingKeyOf } from '@fiap-x/tactical-design/amqp';
import { destroyTestApp } from '@fiap-x/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { MailerSend } from 'mailersend';
import { Model, Types } from 'mongoose';
import { setTimeout } from 'timers/promises';
import {
  ProcessingCompleted,
  ProcessingCompletedInput,
} from '../src/notifications/application/dtos/processing-completed.io';
import {
  FailureMailTemplate,
  SuccessMailTemplate,
} from '../src/notifications/infra/adapters/mailersend/templates';
import { MongooseRecipientSchema } from '../src/notifications/infra/persistence/mongoose/recipient.schema';
import { createTestApp } from './create-app';

describe('NotifyProcessing', () => {
  let app: INestApplication;
  let mailer: MailerSend;
  let amqp: AmqpService;
  let model: Model<MongooseRecipientSchema>;

  beforeAll(async () => {
    app = await createTestApp();

    amqp = app.get(AmqpService);
    model = app.get<Model<MongooseRecipientSchema>>(
      getModelToken(MongooseRecipientSchema.name),
    );

    mailer = await app.resolve(MailerSend);
    mailer.email.send = jest.fn();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  const publishEvent = async (
    amqp: AmqpService,
    event: ProcessingCompleted,
  ) => {
    await amqp.publish(
      `fiap.x.api.events`,
      routingKeyOf(event.eventName),
      event,
    );
    await setTimeout(500);
  };

  const registerRecipient = async () => {
    const recipient = {
      _id: new Types.ObjectId(),
      name: 'Jack Sparrow',
      email: 'jack@sparrow.com',
      externalId: randomUUID(),
    };
    await model.create(recipient);
    return recipient;
  };

  const getEvent = (externalId: string, status: string) => {
    const eventData = new ProcessingCompletedInput();
    eventData.filename = 'Test File';
    eventData.ownerId = externalId;
    eventData.status = status;
    return new ProcessingCompleted(
      randomUUID(),
      randomUUID(),
      ProcessingCompleted.name,
      new Date(),
      0,
      eventData,
    );
  };

  it('should not send any notification email if recipient is not found', async () => {
    jest.spyOn(mailer.email, 'send');
    const event = getEvent(randomUUID(), 'PROCESSED');
    await publishEvent(amqp, event);
    expect(mailer.email.send).not.toHaveBeenCalled();
  });

  it('should send success notification email', async () => {
    jest.spyOn(mailer.email, 'send');
    const recipient = await registerRecipient();
    const event = getEvent(recipient.externalId, 'PROCESSED');
    await publishEvent(amqp, event);
    expect(mailer.email.send).toHaveBeenCalledWith(
      expect.objectContaining({ html: SuccessMailTemplate }),
    );
  });

  it('should send failure notification email', async () => {
    jest.spyOn(mailer.email, 'send');
    const recipient = await registerRecipient();
    const event = getEvent(recipient.externalId, 'FAILED');
    await publishEvent(amqp, event);
    expect(mailer.email.send).toHaveBeenCalledWith(
      expect.objectContaining({ html: FailureMailTemplate }),
    );
  });
});
