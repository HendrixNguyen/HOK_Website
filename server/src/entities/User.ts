import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  username: string

  @Column({ unique: true, nullable: false })
  password: string

  @Column({ length: 50 })
  fullName: string

  @Column({ unique: true })
  email: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
