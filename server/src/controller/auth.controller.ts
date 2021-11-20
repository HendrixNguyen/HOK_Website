import { Request, Response, Router } from 'express'
import { Session, User } from '../entities'

export class AuthController {
  public static buildRouter(): Router {
    const router = Router()
    const self = new this()
    router.post('/register', self.postRegister)
    router.post('/login', self.postLogin)
    router.get('/user', self.getUser)
    return router
  }

  public postRegister = async (req: Request, res: Response) => {
    const { username, email, password, isAdmin, ...data } = req.body as User
    if (await User.count({ username }) > 0) {
      return res.status(400).send({
        success: false,
        message: `Đã tồn tại tài khoản với tên đăng nhập ${username} !`,
      })
    }
    if (await User.count({ email }) > 0) {
      return res.status(400).send({
        success: false,
        message: `Đã tồn tại tài khoản với email ${email} !`,
      })
    }
    const user = User.create({ username, email, ...data }).setPassword(password)
    await user.save()
    return res.status(201).send({
      success: true,
      data: user,
    })
  }

  public postLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body as User
    const user = await User.findOne({ username })
    if (user) {
      if (user.checkPassword(password)) {
        const session = await Session.generateSessionForUser(user);
        return res.status(201).send({
          success: true,
          message: `Chào mừng ${user.fullName} !`,
          data: {
            token: session.id,
          }
        })
      }
      return res.status(401).send({
        success: false,
        message: 'Mật khẩu không đúng !',
      })
    }
    return res.status(404).send({
      success: false,
      message: 'Không tìm thấy tài khoản !',
    })
  }

  public getUser = async (req: Request, res: Response) => {
    const user = await Session.getUserFromRequest(req);
    if (user) {
      return res.status(200).send({
        success: true,
        message: `Chào mừng ${user.fullName} !`,
        data: user,
      })
    }
    return res.status(401).send({
      success: false,
      message: `Token không hợp lệ !`,
    })
  }
}
