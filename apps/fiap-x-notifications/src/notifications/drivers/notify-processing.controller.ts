import { AmqpRetrialPolicy, AmqpSubscription } from '@fiap-x/amqp';
import { routingKeyOfEvent } from '@fiap-x/tactical-design/amqp';
import { Body, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { withPrefix } from '../../config/amqp.config';
import { NotifyProcessingCommand } from '../application/commands/notify-processing.command';
import { ProcessingCompleted } from '../application/dtos/processing-completed.io';

@Injectable()
export class NotifyProcessingController {
  constructor(private readonly commandBus: CommandBus) {}

  @AmqpSubscription({
    exchange: 'fiap.x.api.events',
    routingKey: routingKeyOfEvent(ProcessingCompleted),
    queue: withPrefix(NotifyProcessingCommand.name),
  })
  @AmqpRetrialPolicy({
    delay: 15,
    maxDelay: 15,
    maxAttempts: 5,
  })
  async execute(@Body() event: ProcessingCompleted) {
    await this.commandBus.execute(new NotifyProcessingCommand(event));
  }
}
