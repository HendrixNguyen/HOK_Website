import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Message extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "text", charset: "utf8mb4", length: 5000})
  text: string;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany(() => User, user => user.id)
  user: User[];
}
