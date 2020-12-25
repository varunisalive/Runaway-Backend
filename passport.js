const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/Users");

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_tokens"];
    }
    return token;
}

//authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "IDKMAN"
},(payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
        else 
            return done(null, false);
    });
}));


//Authenticated local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        //error in database
        if(err)
            return done(err);
        //no user found
        if(!user)
            return done(null, false);
        //compare password
        user.comparePassword(password, done);
    });
}))