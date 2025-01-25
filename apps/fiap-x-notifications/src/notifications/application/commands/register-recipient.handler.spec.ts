import { TransactionManager } from '@fiap-x/tactical-design/core';
import {
  FakeRepository,
  FakeTransactionManager,
} from '@fiap-x/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';
import { Recipient } from '../../domain/entities/recipient.entity';
import { RecipientRepository } from '../abstractions/recipient.repository';
import { UserSignedUp, UserSignedUpInput } from '../dtos/user-signed-up.io';
import { RegisterRecipientCommand } from './register-recipient.command';
import { RegisterRecipientHandler } from './register-recipient.handler';

describe('RegisterRecipient', () => {
  let app: INestApplication;
  let target: RegisterRecipientHandler;
  let repository: RecipientRepository;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterRecipientHandler,
        {
          provide: TransactionManager,
          useClass: FakeTransactionManager,
        },
        {
          provide: RecipientRepository,
          useClass: FakeRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    target = app.get(RegisterRecipientHandler);
    repository = app.get(RecipientRepository);
    repository.findByExternalId = jest.fn();
    jest
      .spyOn(repository, 'newId')
      .mockReturnValue(new Types.ObjectId().toHexString());
  });

  const getOwner = () =>
    new Recipient(
      new Types.ObjectId().toHexString(),
      randomUUID(),
      'Jack Sparrow',
      'jack@sparrow.com',
    );

  const createCommand = () => {
    const eventData = new UserSignedUpInput();
    eventData.id = randomUUID();
    eventData.name = 'Jack Sparrow';
    eventData.email = 'jack@sparrow.com';
    const event = new UserSignedUp(
      randomUUID(),
      eventData.id,
      UserSignedUp.name,
      new Date(),
      0,
      eventData,
    );
    return new RegisterRecipientCommand(event);
  };

  it('should ignore if user already exists', async () => {
    const owner = getOwner();
    const command = createCommand();
    jest.spyOn(repository, 'findByExternalId').mockResolvedValue(owner);
    jest.spyOn(repository, 'create').mockResolvedValue();
    await target.execute(command);
    expect(repository.findByExternalId).toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should register if user does not exist yet', async () => {
    const command = createCommand();
    jest.spyOn(repository, 'findByExternalId').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockResolvedValue();
    await target.execute(command);
    expect(repository.findByExternalId).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalled();
  });
});
