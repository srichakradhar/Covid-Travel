const mongoose = require("mongoose");

//setting up schema for guidelines router
const statesSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
    },
    guidelines: [
        {
            guideline: {
                type: String
            }
        }
    ],
    tourist_spots: [
        {
            spot: {
                type: String
            }
        }
    ],
    descriptions: [
        {
            point: {
                type: String
            }
        }
    ]
});

//setting up the states router
const States = mongoose.model("States", statesSchema);

//exporting the states model
module.exports = States;