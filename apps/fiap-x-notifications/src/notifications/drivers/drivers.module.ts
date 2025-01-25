import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { NotifyProcessingController } from './notify-processing.controller';
import { RegisterOwnerController } from './register-owner.controller';

const HttpDrivers = [];

const AmqpDrivers = [RegisterOwnerController, NotifyProcessingController];

@Module({
  imports: [CqrsModule, ApplicationModule],
  providers: [...AmqpDrivers],
  controllers: [...HttpDrivers],
})
export class DriversModule {}
