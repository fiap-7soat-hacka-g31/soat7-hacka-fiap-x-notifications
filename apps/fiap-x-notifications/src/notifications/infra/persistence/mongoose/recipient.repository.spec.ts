import {
  AggregateMergeContext,
  TransactionManager,
} from '@fiap-x/tactical-design/core';
import { FakeMongooseModel } from '@fiap-x/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipientRepository } from '../../../application/abstractions/recipient.repository';
import { MongooseRecipientSchemaFactory } from './recipient-schema.factory';
import { MongooseRecipientRepository } from './recipient.repository';
import { MongooseRecipientSchema } from './recipient.schema';

describe('MongooseRecipientRepository', () => {
  let app: INestApplication;
  let target: RecipientRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionManager,
          useValue: Object.create(TransactionManager.prototype),
        },
        {
          provide: getModelToken(MongooseRecipientSchema.name),
          useClass: FakeMongooseModel,
        },
        {
          provide: MongooseRecipientSchemaFactory,
          useValue: Object.create(MongooseRecipientSchema.prototype),
        },
        {
          provide: AggregateMergeContext,
          useValue: Object.create(AggregateMergeContext.prototype),
        },
        {
          provide: RecipientRepository,
          useClass: MongooseRecipientRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    target = app.get(RecipientRepository);
  });

  it('should instantiate correctly', async () => {
    expect(target).toBeInstanceOf(MongooseRecipientRepository);
  });
});
