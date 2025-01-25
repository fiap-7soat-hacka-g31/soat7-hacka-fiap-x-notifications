import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { MailerSend } from 'mailersend';
import { MailerSendService } from './mailersend.service';
import { FailureMailTemplate, SuccessMailTemplate } from './templates';

describe('MailerSendService', () => {
  let target: MailerSendService;
  let config: ConfigService;
  let mailersend: MailerSend;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        MailerSendService,
        {
          provide: MailerSend,
          useValue: { email: { send: jest.fn() } },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn(), getOrThrow: jest.fn() },
        },
      ],
    }).compile();

    target = moduleFixture.get(MailerSendService);
    config = moduleFixture.get(ConfigService);
    mailersend = moduleFixture.get(MailerSend);

    jest.spyOn(config, 'getOrThrow').mockReturnValue('test.com');
    jest.spyOn(mailersend.email, 'send').mockResolvedValue(null);
  });

  const name = 'Jack Sparrow';
  const email = 'jack@sparrow.com';

  it('should send an email with PROCESSED template', async () => {
    await target.sendProcessingNotification(
      name,
      email,
      'PROCESSED',
      '123',
      'Test File',
    );
    expect(mailersend.email.send).toHaveBeenCalledWith(
      expect.objectContaining({ html: SuccessMailTemplate }),
    );
  });

  it('should send an email with failure template', async () => {
    await target.sendProcessingNotification(
      name,
      email,
      'FAILED',
      '123',
      'Test File',
    );
    expect(mailersend.email.send).toHaveBeenCalledWith(
      expect.objectContaining({ html: FailureMailTemplate }),
    );
  });
});
