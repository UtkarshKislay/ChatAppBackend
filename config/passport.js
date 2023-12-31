import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../modals/User.js';

passport.use(new GoogleStrategy({
    clientID: "1037061046284-8kknfqvq9jc4ebs4rdf37580l83n35df.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
},

    async (accesTocken, refreshTocken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.lastName,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
        };
        try {
            let user = await User.findOne({
                googleId: profile.id
            });
            if (user) {
                console.log("User Exist");
                done(null, user);
            } else {
                user = await User.create(newUser);
                console.log("User create");
                done(null, user);
            }
        } catch (err) {
            console.log(err);
            done(err, null);
        }
    }



));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});