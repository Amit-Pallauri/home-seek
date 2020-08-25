const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcrypt')
const  validator = require('validator')
  
const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 8
    },
    lastName : {
        type : String,
        required : false,
        default : ' ',
        trim : true,
        minlength : 3,
        maxlength : 10   
    },
    email:{
        type : String,
        required : true,
        trim : true,
        unique : true,
        validate : {
            validator : (data)=>{
                return validator.isEmail(data)
            },
            message : props => `${props.value} is not a valid mail id ` 
        }
    },
    password : {
        type : String,
        required : function(){
            return !this.isThirdPartyUser
        },
        trim : true,
        minlength : 5
    },
    isThirdPartyUser : {
        type : Boolean,
        required: false,
        default: false
    },
    accessToken : {
        type: String,
        required: false
    },
    tempToken : {
        type: String,
        required : false
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
        type : Date,
        validate : {
            validator : (data) => {
                return data.toLocaleDateString()
            },
            message : props => `${props.value} is not a valid date format`
        },
        required : false,
        default : new Date().toLocaleDateString()
    },
    gender : {
        type : String,
        default : 'male',
        enum : ['male', 'female', 'other']
    },
    Address : {
        city: {
            type : String,
            default : " "
        },
        district : {
            type : String,
            default : " "
        },
        state : {
            type : String,
            default : " "
        },
        pincode : {
            type : Number,
            default : " "
        }
    },
    maritalStatus :{
        type : String,
        default : 'single',
        enum : ["married", "single"]
    },
    owner: {
        type: Boolean,
        default: false
    },
    dateOfCheckIn : {
        type : Date,
        validate : {
            validator : (data) => {
                return data.toLocaleDateString()
            },
            message : props => `${props.value} is not a valid date format`
        },
        required : false,
        default : new Date().toLocaleDateString()
    },
    dateOfCheckOut : {
        type : Date,
        validate : {
            validator : (data) => {
                return data.toLocaleDateString()
            },
            message : props => `${props.value} is not a valid date format`
        },
        required : false,
        default : new Date().toLocaleDateString()
    },
    bankDetails : {
        AccountName : {
            type : String,
            default : 'e.g., john'
        },
        AccountNo : {
            type: String,
            default : '7000897645709AS'
        },
        BankName : {
            type : String,
            default : 'state bank of india'
        },
        IFSC : {
            type : String,
            default : 'JDKDH6768S'
        }
    },
    rentPaid : {
        AdvnacePaid : {
            value : { 
                type : Number
            },
            onDate : {
                type : Date
            }
        },
        monthlyPayment : [{
            value : { 
                type : Number
            },
            onDate : {
                type : Date
            }
        }]
    },
    home : {
        type : Schema.Types.ObjectId,
        ref : 'posts'
    },
    rentReceivedAsOwner : {
        type: Number
    },
    normalRequests: [{
        type: Schema.Types.ObjectId,
        ref: "normalRequest"
    }],
    userRequests: [{
        type: Schema.Types.ObjectId,
        ref: "userRequest"
    }],
    listings: [{
        type: Schema.Types.ObjectId,
        ref: "posts"
    }],
    isVerifiedPhoneNumber: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String
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