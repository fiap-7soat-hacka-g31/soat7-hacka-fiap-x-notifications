import { Entity } from '@fiap-x/tactical-design/core';

export class Recipient extends Entity {
  constructor(
    protected readonly _id: string,
    private readonly _externalId: string,
    private readonly _name: string,
    private readonly _email: string,
  ) {
    super(_id);
  }

  get name() {
    return this._name;
  }

  get externalId() {
    return this._externalId;
  }

  get email() {
    return this._email;
  }
}
