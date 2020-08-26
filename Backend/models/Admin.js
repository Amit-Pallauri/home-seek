const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  validator = require('validator')
const { hash, compare } = require('bcrypt')
const adminSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
            minlength : 3,
            maxlength : 8
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
            required : true,
            trim : true,
            minlength : 5
        },
        accessToken : {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true
        },
        requests: {
            type: Schema.Types.ObjectId,
            ref:"user"
        },
        verifiedHomes: [{
            type: Schema.Types.ObjectId,
            ref:"posts"
        }]
        // requestedUsers: {
        //     type: Schema.Types.ObjectId,
        //     ref:"users"        
        // }
    },
    {timestamps: true}
)


adminSchema.statics.findByEmailAndPassword = async (email, password) =>{
    try {
        const foundAdmin = await Admin.findOne({email});
        if(!foundAdmin) throw new Error('Incorrect credentials1');
        const isMatched = await compare(password, foundAdmin.password);
        if(!isMatched) throw new Error('incorrect credentials2');
        return foundAdmin;
    } catch (error) {
        error.name = 'AuthError';
        throw error;
    } 
}

adminSchema.pre('save', async function(next){
    const admin = this 
    try {
        if(admin.isModified('password')) {
            const hashedPassword = await hash(admin.password, 10);
            admin.password = hashedPassword
            next();
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin