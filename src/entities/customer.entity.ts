import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Account } from './account.entity';
import { AppBaseEntity } from './base-entity.entity';

@Entity()
export class Customer extends AppBaseEntity<Customer> {
  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @OneToOne(() => Account)
  account: Account;
}
