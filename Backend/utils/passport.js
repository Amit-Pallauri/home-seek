const passport  = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStractegy =  require('passport-facebook').Strategy
const User = require('../models/Users')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID : GOOGLE_CLIENT_ID,
    clientSecret : GOOGLE_CLIENT_SECRET,
    callbackURL : "http://localhost:3000/google/redirect",
    proxy: true
},
    async (_, _1, profile, done) => {
        try {
            const { _json : { given_name : firstName, family_name : lastName, email, picture : image }} = profile
            let user = await User.findOne({email})
            if(!user) 
                user = await User.create({
                    firstName, lastName, email, image, isThirdPartyUser : true, verified : true}) 
            done(null, user)
        } catch (err) {
            console.log(err)
            err.name == 'Error' ? done(err) : null
        }
    }
))

passport.use(new FacebookStractegy({
    clientID : FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL : 'http://localhost:3000/fb/redirect',
    profileFields : ['id', 'emails', 'name', 'picture.type(large)']
},
    async (_, _1, profile, done) => {
        try {
            const { _json : { first_name : firstName, last_name : lastName, email, picture } } = profile
            const image = picture.data.url
            console.log(profile._json)
            let user = await User.findOne({ email });
            if(!user)
                user = await User.create({ email, firstName, lastName, image, isThirdPartyUser : true, verified : true})
            return done(null, user);    
        } catch (error) {
            console.error(error)
            return done(error)
        }
    }
))