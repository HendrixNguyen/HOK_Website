import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Friend} from "./Friend";
import { Message } from './Message';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({unique: true, nullable: false})
  password: string;

  @Column({length: 50})
  fullName: string;

  @Column({unique: true})
  email: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({default: false})
  isAdmin: boolean;

  @OneToMany(() => Friend, friend => friend.user)
  friends: Friend[];

  @OneToMany(() => Message, message => message.id)
  messages: Message;
}
