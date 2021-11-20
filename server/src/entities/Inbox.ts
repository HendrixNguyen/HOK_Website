import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity('inboxes')
export class Inbox extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => User, (user) => user.id)
  users: User[]
}
