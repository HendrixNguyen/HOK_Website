import {User} from '../entities/User'
import {Request, Response, Router} from 'express'
import passport from "passport";
import bcrypt from "bcrypt";

export class UserController {

  public static buildRouter(): Router {
    const router = Router()
    const self = new this();
    router.get('/', self.getAllUser)
    router.post('signup/', self.createUser)
    router.post('login/:id', self.findUser)
    router.put('/:id', self.updateUser)
    // router.delete('/:id', self.deleteUser)
    return router
  }

  public getAllUser = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const users = await User.find()
      return res.status(201).json({users})
    } catch (err) {
      return res.status(404).send(err);
    }
  }

  // public createUser = async (
  //   req: Request,
  //   res: Response
  // ): Promise<Response> => {
  //   try {
  //     const newUser = req.body()
  //     // const { } = req.body();
  //     if (newUser.username === await User.findOne('username')) {
  //       const result = await User.save(newUser)
  //       return res.json(result)
  //     }
  //     return res.status(200).send('Succeed')
  //   } catch (err) {
  //     return res.status(400).send('Error creating User')
  //   }
  // }

  public createUser = async (req: Request, res: Response) => {
    const {username, password, email, fullName, password2} = req?.body;
    let errors: Array<object> = [];
    if (!username || !email || !fullName || !password || !password2) {
      errors.push({msg: 'Please enter all fields'});
    }
    const user = await User.findOne({username});
    if (user) {
      errors.push({msgs: 'User already exists'})
      res.render('/users/signup', {
        errors,
        username,
        email,
        fullName,
        password,
        password2
      });
    } else {
      const newUser = new User();
      Object.assign(newUser, {username, email, fullName, password});
      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, encryptedPassword) => {
          if (err) throw err;
          newUser.password = encryptedPassword;
          await User.save(newUser)
            .then(() => {
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
      });

    }
  }

//find 1 user:id
  public findUser = async () => passport.authenticate(
    'local', {
      failureRedirect: '/login',
      successRedirect: '/'
    },
  )
//update user
  public updateUser = async (
    _req: Request,
    res: Response
  ) => {
    try {
      res.status(201).send('succeed')
    } catch (err) {
      res.status(404).send(err)
    }
  }
}
