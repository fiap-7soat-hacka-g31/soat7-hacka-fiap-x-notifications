import { UserSignedUp } from '../dtos/user-signed-up.io';

export class RegisterRecipientCommand {
  constructor(readonly event: UserSignedUp) {}
}
