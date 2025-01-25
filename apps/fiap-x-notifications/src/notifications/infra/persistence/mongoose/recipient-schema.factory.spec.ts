import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';
import { Recipient } from '../../../domain/entities/recipient.entity';
import { MongooseRecipientSchemaFactory } from './recipient-schema.factory';
import { MongooseRecipientSchema } from './recipient.schema';

const getFullAggregate = (): Recipient =>
  new Recipient(
    new Types.ObjectId().toHexString(),
    randomUUID(),
    'Jack Sparrow',
    'jack@sparrow.com',
  );

const getFullSchema = (): MongooseRecipientSchema => ({
  _id: new Types.ObjectId(),
  externalId: randomUUID(),
  name: 'Jack Sparrow',
  email: 'jack@sparrow.com',
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe('MongooseRecipientSchemaFactory', () => {
  let app: INestApplication;
  let target: MongooseRecipientSchemaFactory;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [MongooseRecipientSchemaFactory],
    }).compile();

    app = moduleFixture.createNestApplication();
    target = app.get(MongooseRecipientSchemaFactory);
  });

  it('should transform a entity into a schema', async () => {
    const actual = getFullAggregate();
    const result = target.entityToSchema(actual);
    expect(result._id).toBeInstanceOf(Types.ObjectId);
    expect(result).not.toBeInstanceOf(Recipient);
  });

  it('should transform a schema into an entity', async () => {
    const actual = getFullSchema();
    const result = target.schemaToEntity(actual);
    expect(result.id).not.toBeInstanceOf(Types.ObjectId);
    expect(result.id).toBe(actual._id.toHexString());
    expect(result).toBeInstanceOf(Recipient);
  });
});
