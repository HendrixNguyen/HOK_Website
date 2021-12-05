import { createHash } from 'crypto'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Inbox } from './Inbox'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({ length: 150 })
  fullName: string

  @Column({ unique: true })
  email: string

  @Column({ default: false })
  isAdmin: boolean

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @ManyToMany(() => Inbox, (inbox) => inbox.users)
  @JoinTable()
  inboxes: Inbox[]
  messages: any

  public checkPassword(password: string): boolean {
    return this.password == createHash('sha1').update(password).digest('hex')
  }

  public setPassword(password: string): this {
    this.password = createHash('sha1').update(password).digest('hex')
    return this
  }
}
