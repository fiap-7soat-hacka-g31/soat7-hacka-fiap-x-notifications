import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { NotifyProcessingHandler } from './commands/notify-processing.handler';
import { RegisterRecipientHandler } from './commands/register-recipient.handler';

const QueryHandlers = [];
const CommandHandlers = [RegisterRecipientHandler, NotifyProcessingHandler];

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ApplicationModule {}
