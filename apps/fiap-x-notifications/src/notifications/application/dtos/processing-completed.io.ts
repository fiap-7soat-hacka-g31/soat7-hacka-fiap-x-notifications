import { IntegrationEvent } from '@fiap-x/tactical-design/core';
import { IsOptional, IsString } from 'class-validator';

export class ProcessingCompletedInput {
  @IsString()
  ownerId: string;

  @IsString()
  filename: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  downloadSignedUrl: string;
}

export class ProcessingCompleted extends IntegrationEvent<ProcessingCompletedInput> {}
