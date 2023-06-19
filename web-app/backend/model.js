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
            url: {
                type : String
            },
            title: {
              type : String  
            }
        }],

        toBeRecommended: [{
            url: {
                type : String
            },
            title: {
              type : String  
            }
        }]

    }
)

const User = mongoose.model('User', userSchema)
 module.exports = User