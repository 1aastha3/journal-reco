const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: {
            type: "String",
            required: true
        },
        email: {
            type: "String",
            unique: true,
            required: true,
        },

        password: {
            type: "String",
            unique: true,
            required : true
        },
        
        signUp: {
            type: Date,
        },

        lastMail: {
            type: Date,
        },

        recommendedTillNow: [{
            type: mongoose.Schema.Types.ObjectId,
        }]

    }
)

const User = mongoose.model('User', userSchema)
 module.exports = User