import { User } from '../entities/User'
import { MigrateManager } from '.'
import { BaseMigrater } from './manager'

export class UsersMigrater extends BaseMigrater {
  public async run(): Promise<void> {
    if ((await User.count()) == 0) {
      await User.create({
        username: 'admin',
        fullName: 'Admin User',
        email: 'admin@admin.com',
        isAdmin: true,
      })
        .setPassword('admin')
        .save()
    }
  }
}

MigrateManager.register(new UsersMigrater())
