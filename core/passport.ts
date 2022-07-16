import passport from 'passport'
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { UserModel, UserModelDocumentInterface, UserModelInterface } from "../models/UserModel";

passport.use(
  new LocalStrategy(
    async (username: string, password: string, done): Promise<void> => {
      try {
        const user = await UserModel.findOne({ $or: [{ email: username }, { username }] }).exec();
        if (!user) return done(null, false);

        const isValidPass = await bcrypt.compare(password, user.password);

        if (isValidPass) done(null, user);
        else done(null, false);


      } catch (err) {
        done(err, false);
      }
  })
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_KEY || 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload: { data: UserModelInterface }, done) => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();

        if (user) return done(null, user);

        done(null, false);
      } catch (err) {
        done(err);
      }
    })
)

// passport

passport.serializeUser((user: any, done) => {
  done(null, user?._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: Error, user: UserModelDocumentInterface) => {
    done(err, user);
  })
})

export { passport }
