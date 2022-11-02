import { AppBaseEntity } from '@app/entities/base-entity.entity';
import { Entity, EntityData, Property } from '@mikro-orm/core';

@Entity()
export class Account extends AppBaseEntity {
  @Property({ nullable: true, unique: true })
  email?: string;

  @Property()
  role: string;

  constructor(account?: EntityData<Account>) {
    super();
    account && Object.assign(this, account);
  }
}
