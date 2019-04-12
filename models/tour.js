const mongoose = require('mongoose');

var Tour = mongoose.model('Tour', {
    place: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    cost: {
        actual_cost: {
            type: Number,
           required: true,
        },
        discount_cost: {
            type: Number,
            required: true,
        }
    },
    Itinerary: {
        
        Day1: [
            {
                type: String,
            }
        ],
        Day2: [
            {
                type: String,
            }
        ],
       
    }
});

module.exports = {
    Tour
};