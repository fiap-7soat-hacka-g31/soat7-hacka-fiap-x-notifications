import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfraModule } from '../infra/infra.module';
import { RegisterRecipientHandler } from './commands/register-recipient.handler';

const QueryHandlers = [];
const CommandHandlers = [RegisterRecipientHandler];

@Module({
  imports: [CqrsModule, InfraModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ApplicationModule {}
