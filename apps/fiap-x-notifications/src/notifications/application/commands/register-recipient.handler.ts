import { Transactional } from '@fiap-x/tactical-design/core';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Recipient } from '../../domain/entities/recipient.entity';
import { RecipientRepository } from '../abstractions/recipient.repository';
import { RegisterRecipientCommand } from './register-recipient.command';

@CommandHandler(RegisterRecipientCommand)
export class RegisterRecipientHandler
  implements ICommandHandler<RegisterRecipientCommand, void>
{
  constructor(private readonly repository: RecipientRepository) {}

  @Transactional()
  async execute(command: RegisterRecipientCommand): Promise<void> {
    const { id, email, name } = command.event.data;
    const exists = await this.repository.findByExternalId(id);
    if (exists) {
      return;
    }
    const recipient = new Recipient(this.repository.newId(), id, name, email);
    await this.repository.create(recipient);
  }
}
