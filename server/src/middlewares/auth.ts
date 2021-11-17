// import { Request, Response } from "express";
// import { User } from "../entities/User";
// import * as bcrypt from "bcrypt";
//
// export class Authorization {
//   protected register(req: Request, res: Response) {
//     const { username, email, fullName, password, password2 } = req.body;
//     let errors: Array<object> = [];
//
//     if (!username || !email || !fullName || !password || !password2) {
//       errors.push({ msg: 'Please enter all fields' });
//     }
//
//     if (password != password2) {
//       errors.push({ msg: 'Passwords do not match' });
//     }
//
//     if (password.length < 6) {
//       errors.push({ msg: 'Password must be at least 6 characters' });
//     }
//
//     if (errors.length > 0) {
//       res.render('register', {
//         errors,
//         username,
//         email,
//         fullName,
//         password,
//         password2
//       });
//     } else {
//       User.findOne({ email: email }).then(user => {
//         if (user) {
//           errors.push({ msg: 'Email already exists' });
//           res.render('register', {
//             errors,
//             username,
//             email,
//             fullName,
//             password,
//             password2
//           });
//         } else {
//           const newUser = new User();
//           Object.assign(newUser, { username, email, fullName });
//
//           bcrypt.genSalt(10, (_err, salt) => {
//             bcrypt.hash(password, salt, async (err, encryptedPassword) => {
//               if (err) throw err;
//               newUser.password = encryptedPassword;
//               await User.save(newUser).then(() => {
//                 req.flash({ 'success_msg': 'You are now registered and can log in' });
//                 res.redirect('/users/login');
//               })
//                 .catch(err => console.log(err));
//             });
//           });
//         }
//       });
//     }
//   }
// }
import passport from "passport";
import passportLocal from "passport-local";
import {User} from "../entities/User";
import bcrypt from "bcrypt";

let LocalStrategy = passportLocal.Strategy;

export let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (_req, email, password, done)=> {
    try {
      let user = await User.findOne(email);
      if (!user) {
        return done(null, false);
      }

      let checkPassword = await(bcrypt.compare(password, user.password));

      if (!checkPassword) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(null, false,);
    }
  }));
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: User, done) {
  return done(null, user);
});
