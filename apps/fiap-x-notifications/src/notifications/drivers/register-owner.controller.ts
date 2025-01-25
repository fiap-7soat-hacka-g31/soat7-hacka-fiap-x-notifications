import { AmqpRetrialPolicy, AmqpSubscription } from '@fiap-x/amqp';
import { routingKeyOfEvent } from '@fiap-x/tactical-design/amqp';
import { Body, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { withPrefix } from '../../config/amqp.config';
import { RegisterRecipientCommand } from '../application/commands/register-recipient.command';
import { UserSignedUp } from '../application/dtos/user-signed-up.io';

@Injectable()
export class RegisterOwnerController {
  constructor(private readonly commandBus: CommandBus) {}

  @AmqpSubscription({
    exchange: 'fiap.x.identity.events',
    routingKey: routingKeyOfEvent(UserSignedUp),
    queue: withPrefix(RegisterRecipientCommand.name),
  })
  @AmqpRetrialPolicy({
    delay: 15,
    maxDelay: 5,
    maxAttempts: 5,
  })
  async execute(@Body() event: UserSignedUp) {
    await this.commandBus.execute(new RegisterRecipientCommand(event));
  }
}
