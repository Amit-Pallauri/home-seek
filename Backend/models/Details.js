const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema(
    {
        rent: {
            type: Number,
            required: true
        },
        type : {
            type : String,
            enum : ['bachelor', 'family']
        },
        location: {
            type: {
              type: String,
              enum: ['Point']
            },
            coordinates: {
              type: [Number],
              index: '2dsphere'
            },
            city : String,
            state : String,
            formattedAddress: String,
        },
        deposit: {
            type: String,
            required: true
        },
        bedrooms: {
            type: Number
        },
        bathRooms: {
            type: Number
        },
        furnishing: {
            sofa:{
                type: Boolean,
                default: false
            },
            tv : {
                type: Boolean,
                default: false
            },
            dish: {
                type: Boolean,
                default: false
            },
            wifi: {
                type: Boolean,
                default: false
            },
            fridge: {
                type: Boolean,
                default: false
            },
            oven: {
                type: Boolean,
                default: false
            },
            beds: {
                type: Boolean,
                default: false
            },
            noOfBeds: {
                type: Number
            }
        },
        listedBy: {
            type: String
        },
        superBuiltUpArea: {
            type: String,
            required: true
        },
        carpetArea: {
            type: String,
            required: true
        },
        totalFloors: {
            type: Number
        },
        floorNumber: {
            type: String
        },
        carParking: {
            type: String
        },
        facing: {
            type: String
        },
        projectName: {
            type: String
        },
        images: [{
            type: String
        }]
    }
)

const Details = mongoose.model("details", detailsSchema)

module.exports = Details