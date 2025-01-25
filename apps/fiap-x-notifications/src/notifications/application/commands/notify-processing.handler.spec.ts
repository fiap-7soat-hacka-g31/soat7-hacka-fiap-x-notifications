import { TransactionManager } from '@fiap-x/tactical-design/core';
import {
  FakeRepository,
  FakeTransactionManager,
} from '@fiap-x/test-factory/utils';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';
import { Recipient } from '../../domain/entities/recipient.entity';
import { MailerSendService } from '../../infra/adapters/mailersend/mailersend.service';
import { MailerService } from '../abstractions/mailer.service';
import { RecipientRepository } from '../abstractions/recipient.repository';
import {
  ProcessingCompleted,
  ProcessingCompletedInput,
} from '../dtos/processing-completed.io';
import { NotifyProcessingCommand } from './notify-processing.command';
import { NotifyProcessingHandler } from './notify-processing.handler';

describe('NotifyProcessingHandler', () => {
  let target: NotifyProcessingHandler;
  let repository: RecipientRepository;
  let mailer: MailerService;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        NotifyProcessingHandler,
        {
          provide: MailerService,
          useValue: Object.create(MailerSendService.prototype),
        },
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

    moduleFixture.createNestApplication();
    target = moduleFixture.get(NotifyProcessingHandler);
    repository = moduleFixture.get(RecipientRepository);
    repository.findByExternalId = jest.fn();
    mailer = moduleFixture.get(MailerService);
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
    const eventData = new ProcessingCompletedInput();
    eventData.filename = 'Test File';
    eventData.ownerId = 'owner:123';
    eventData.status = 'PROCESSED';
    const event = new ProcessingCompleted(
      randomUUID(),
      'aggregate:123',
      ProcessingCompleted.name,
      new Date(),
      0,
      eventData,
    );
    return new NotifyProcessingCommand(event);
  };

  it('should send notificaiton email', async () => {
    const owner = getOwner();
    const command = createCommand();
    jest.spyOn(repository, 'findByExternalId').mockResolvedValue(owner);
    jest.spyOn(mailer, 'sendProcessingNotification').mockResolvedValue();
    await target.execute(command);
    expect(repository.findByExternalId).toHaveBeenCalled();
    expect(mailer.sendProcessingNotification).toHaveBeenCalled();
  });

  it('should throw if recipient is not found', async () => {
    const command = createCommand();
    jest.spyOn(repository, 'findByExternalId').mockResolvedValue(null);
    jest.spyOn(mailer, 'sendProcessingNotification').mockResolvedValue();
    await expect(async () => await target.execute(command)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.findByExternalId).toHaveBeenCalled();
    expect(mailer.sendProcessingNotification).not.toHaveBeenCalled();
  });
});
