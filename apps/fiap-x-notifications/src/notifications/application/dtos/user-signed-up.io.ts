import { IntegrationEvent } from '@fiap-x/tactical-design/core';
import { IsString } from 'class-validator';

export class UserSignedUpInput {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}

export class UserSignedUp extends IntegrationEvent<UserSignedUpInput> {}
