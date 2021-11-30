import { Router } from 'express'

export class UserController {
  public static buildRouter(): Router {
    const router = Router()
    const self = new this();
    router.post('/send', sendMessage);

    public sendMessage = async (req: Request, res: Response) => {
      const { id, message, ...data } = req.body as Session;
      if (id) {
        const session = await Session.findOne({ id });
        if (session) {
          const user = await User.findOne({ id: session.userId });
          if (user) {
            const newMessage = new Message({
              userId: user.id,
              message,
              ...data,
            });
            await newMessage.save();
            return res.status(200).send({
              success: true,
              message: 'Gửi tin nhắn thành công !',
            });
          }
        }
      }
    }
  }
}
