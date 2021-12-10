import { User } from '.'
import { BaseEntity, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('inboxes')
export class Inbox extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToMany(() => User, (user) => user.inboxes)
  users: User[]

  // public getMessages(user: User) {
  //   return this.users.map((user) => user.messages)
  // }
}
