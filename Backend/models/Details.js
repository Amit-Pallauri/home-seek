const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema(
    {
        Type: {
            type: String,
            required: true
        },
        Bedrooms: {
            type: String
        },
        BathRooms: {
            type: String
        },
        Furnishing: {
            type: String
        },
        ListedBy: {
            type: String
        },
        SuperBuiltUpArea: {
            type: String,
            required: true
        },
        CarpetArea: {
            type: String,
            required: true
        },
        BachelorsAllowed: {
            type: String,
            required: true
        },
        Maintenance: {
            type: String
        },
        TotalFloors: {
            type: String
        },
        FloorNumber: {
            type: String
        },
        CarParking: {
            type: String
        },
        Facing: {
            type: String
        },
        ProjectName: {
            type: String
        }

    }
)

const Details = mongoose.model("details", detailsSchema)

module.exports = Details