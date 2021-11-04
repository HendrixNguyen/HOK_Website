import {Request, Response} from "express";
import {User} from "../entities/User";
import * as bcrypt from "bcrypt";

export class Authorization {
  protected register(req: Request, res: Response){
    const {username, email, fullName, password, password2} = req.body;
    let errors: Array<any> = [];

    if (!username || !email || !fullName || !password || !password2) {
      errors.push({msg: 'Please enter all fields'});
    }

    if (password != password2) {
      errors.push({msg: 'Passwords do not match'});
    }

    if (password.length < 6) {
      errors.push({msg: 'Password must be at least 6 characters'});
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        username,
        email,
        fullName,
        password,
        password2
      });
    } else {
      User.findOne({email: email}).then(user => {
        if (user) {
          errors.push({msg: 'Email already exists'});
          res.render('register', {
            errors,
            username,
            email,
            fullName,
            password,
            password2
          });
        } else {
          /*
          * Theo mongoose, lấy mạng ra
          * const newUser = new User({username, email, fullName, password});
          * bcrypt.genSalt(10, (_err, salt) => {
            bcrypt.hash( newUser.password ,salt, async (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then(() => {
                req.flash({'success_msg': 'You are now registered and can log in'});
                res.redirect('/users/login');
              })
                .catch(err => console.log(err));
            });
          });
          * */
          const newUser: Array<User> = [username ,password, fullName, email];

          bcrypt.genSalt(10, (_err, salt) => {
            bcrypt.hash(  ,salt, async (err, hash) => {
              if (err) throw err;
              newUser.indexOf(1) = Number(hash);
              await User.save(newUser).then(() => {
                req.flash({'success_msg': 'You are now registered and can log in'});
                res.redirect('/users/login');
              })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  }
}
