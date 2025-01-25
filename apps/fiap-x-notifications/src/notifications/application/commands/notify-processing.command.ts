import { ProcessingCompleted } from '../dtos/processing-completed.io';

export class NotifyProcessingCommand {
  constructor(readonly event: ProcessingCompleted) {}
}
