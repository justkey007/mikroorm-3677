import { Account } from '@app/entities/account.entity';
import { Customer } from '@app/entities/customer.entity';
import { EntityData, GetRepository } from '@mikro-orm/core';
import { EntityRepository, MikroORM } from '@mikro-orm/postgresql';

describe('Customer (e2e)', () => {
  let orm: MikroORM;
  let accountsRepository: GetRepository<Customer, EntityRepository<Account>>;
  let customersRepository: GetRepository<Account, EntityRepository<Customer>>;

  beforeAll(async () => {
    orm = await MikroORM.init({
      type: 'postgresql',
      dbName: 'testapp-test',
      host: 'localhost',
      port: 5432,
      user: 'docker',
      password: 'docker',
      entities: [Account, Customer]
    });

    const em = orm.em.fork();
    accountsRepository = em.getRepository(Account);
    customersRepository = em.getRepository(Customer);

    const generator = orm.getSchemaGenerator();
    await generator.ensureDatabase();
    await generator.refreshDatabase();
  });

  const createAccount = async (data: EntityData<Account>) => {
    const account = accountsRepository.create(data);
    await accountsRepository.nativeInsert(account);
    return account;
  };

  const createCustomer = async (data: EntityData<Account & Customer>) => {
    const customer = customersRepository.create(data);
    const account = await createAccount({ ...data, role: 'CUSTOMER' });
    customer.account = account;
    await customersRepository.persistAndFlush(customer);
    return customer;
  };

  it('Should create a customer', async () => {
    const customer = await createCustomer({
      firstName: 'Dev',
      lastName: 'BO',
      email: 'xxxxx@xxxxx.com'
    });
    expect(customer.id).toBeDefined();
  });
});
