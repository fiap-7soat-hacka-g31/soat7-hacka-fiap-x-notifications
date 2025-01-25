import { DomainEvent } from '@fiap-x/tactical-design/core';

export class MailSentEvent extends DomainEvent {
  constructor(
    public readonly ownerId: string,
    public readonly videoId: string,
    public readonly type: string,
  ) {
    super();
  }
}
