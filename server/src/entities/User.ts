import { HobbyDetail } from './HobbyDetail';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ unique: true, nullable: false })
  username: string

  @Column({ unique: true, nullable: false })
  password: string

  @Column({ length: 50 })
  fullName: string

  @Column({ unique: true })
  email: string

  @Column()
  image:ImageData

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
  @OneToMany(() => HobbyDetail, a => a.user)
  usertoHobby: HobbyDetail[]
}
