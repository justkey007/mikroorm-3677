import { BaseEntity, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

export class AppBaseEntity<T extends AppBaseEntity<T> = any> extends BaseEntity<T, 'id'> {
  @PrimaryKey()
  id?: string = v4();
}
