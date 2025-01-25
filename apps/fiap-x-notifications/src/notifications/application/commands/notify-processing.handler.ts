import { Transactional } from '@fiap-x/tactical-design/core';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MailerService } from '../abstractions/mailer.service';
import { RecipientRepository } from '../abstractions/recipient.repository';
import { NotifyProcessingCommand } from './notify-processing.command';

@CommandHandler(NotifyProcessingCommand)
export class NotifyProcessingHandler
  implements ICommandHandler<NotifyProcessingCommand, void>
{
  constructor(
    private readonly repository: RecipientRepository,
    private readonly mailer: MailerService,
  ) {}

  @Transactional()
  async execute(command: NotifyProcessingCommand): Promise<void> {
    const { aggregateId } = command.event;
    const { filename, ownerId, status } = command.event.data;
    const recipient = await this.repository.findByExternalId(ownerId);
    if (!recipient) {
      throw new NotFoundException(`No recipient found for id ${ownerId}`);
    }
    await this.mailer.sendProcessingNotification(
      recipient.name,
      recipient.email,
      status,
      aggregateId,
      filename,
    );
  }
}
