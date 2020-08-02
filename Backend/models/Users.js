const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcrypt')

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true   
    },
    email:{
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    accessToken : {
        type: String,
        required: false
    },
    verified : {
        type : Boolean,
        default : false,
        required : false
    },
    image : {
        type : String,
        required : false
    },
    DOB : {
        type : String,
        required : false
    },
    Address : {
        city: String,
        district : String,
        state : String,
        pincode : Number 
    } 
}, {timestamps : true })

userSchema.statics.findByEmailAndPassword = async (email, password) =>{
    try {
        const foundUser = await User.findOne({email});
        if(!foundUser) throw new Error('Incorrect credentials');
        const isMatched = await compare(password, foundUser.password);
        if(!isMatched) throw new Error('incorrect credentials');
        return foundUser;
    } catch (error) {
        error.name = 'AuthError';
        throw error;
    } 
}

userSchema.pre('save', async function(next){
    const user = this 
    try {
        if(user.isModified('password')) {
            const hashedPassword = await hash(user.password, 10);
            user.password = hashedPassword
            next();
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

const User = model('user', userSchema)
module.exports = User