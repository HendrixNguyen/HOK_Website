import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Request } from 'express'
import { User } from '.'

@Entity('sessions')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinTable()
  user: User

  @CreateDateColumn()
  createAt: Date

  public static async generateSessionForUser(user: User) {
    return this.create({ user }).save();
  }

  public static async getUserFromSessionId(sessionId: string) {
    const result = await this.findOne(sessionId);
    console.log(result);
    return this.findOne(sessionId).then(session => session?.user);
  }

  public static async getUserFromRequest(request: Request) {
    const token = request.headers['x-token']?.toString();
    if (token) {
      return this.getUserFromSessionId(token);
    }
    return null;
  }
}
