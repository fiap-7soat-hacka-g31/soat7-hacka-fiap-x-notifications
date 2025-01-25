import { AmqpService } from '@fiap-x/amqp';
import { routingKeyOf } from '@fiap-x/tactical-design/amqp';
import { destroyTestApp } from '@fiap-x/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { setTimeout } from 'timers/promises';
import {
  UserSignedUp,
  UserSignedUpInput,
} from '../src/notifications/application/dtos/user-signed-up.io';
import { MongooseRecipientSchema } from '../src/notifications/infra/persistence/mongoose/recipient.schema';
import { createTestApp } from './create-app';
describe('RegisterRecipient', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  const publishEvent = async (amqp: AmqpService, event: UserSignedUp) => {
    await amqp.publish(
      `fiap.x.identity.events`,
      routingKeyOf(event.eventName),
      event,
    );
    await setTimeout(500);
  };

  const getEvent = (externalId: string) => {
    const eventData = new UserSignedUpInput();
    eventData.id = externalId;
    eventData.name = 'Jack Sparrow';
    eventData.email = 'jack@sparrow.com';
    return new UserSignedUp(
      randomUUID(),
      eventData.id,
      UserSignedUp.name,
      new Date(),
      0,
      eventData,
    );
  };

  it('should register recipient', async () => {
    const amqp = app.get(AmqpService);
    const model = app.get<Model<MongooseRecipientSchema>>(
      getModelToken(MongooseRecipientSchema.name),
    );
    const event = getEvent(randomUUID());
    await publishEvent(amqp, event);

    const persisted = await model
      .findOne({ externalId: event.aggregateId })
      .exec();
    expect(persisted).toBeDefined();
    expect(persisted.name).toBe(event.data.name);
    expect(persisted.email).toBe(event.data.email);
    expect(persisted.externalId).toBe(event.data.id);
  });

  it('should register recipient more than once', async () => {
    const amqp = app.get(AmqpService);
    const model = app.get<Model<MongooseRecipientSchema>>(
      getModelToken(MongooseRecipientSchema.name),
    );
    const event = getEvent(randomUUID());
    await publishEvent(amqp, event);
    await publishEvent(amqp, event);

    const persisted = await model
      .find({ externalId: event.aggregateId })
      .exec();
    expect(persisted).toBeDefined();
    expect(persisted.length).toBe(1);
  });
});
