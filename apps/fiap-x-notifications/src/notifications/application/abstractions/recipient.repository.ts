import { Repository } from '@fiap-x/tactical-design/core';
import { Recipient } from '../../domain/entities/recipient.entity';

export abstract class RecipientRepository implements Repository<Recipient> {
  abstract create(entity: Recipient): Promise<void>;
  abstract update(entity: Recipient): Promise<void>;
  abstract findById(id: string): Promise<Recipient>;
  abstract findAll(): Promise<Recipient[]>;
  abstract newId(): string;
  abstract findByExternalId(externalId: string): Promise<Recipient>;
}
