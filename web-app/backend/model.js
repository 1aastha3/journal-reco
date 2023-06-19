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

        interests: {
            type: [String],
            default : []
        },
        
        signUp: {
            type: Date,
            default: Date.now
        },

        lastMail: {
            type: Date,
        },

        recommendedTillNow: [{
            identifier: {
                type : mongoose.Schema.Types.ObjectId
            },
            url: {
                type : String
            },
            title: {
              type : String  
            }
        }],

        toBeRecommended: [
            {
                type : mongoose.Schema.Types.ObjectId
            }
        ]

    }
)

const User = mongoose.model('User', userSchema)
 module.exports = User