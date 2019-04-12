const mongoose = require('mongoose');

var Resort = mongoose.model('Resort', {
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
        welcome_drinks: {
            type: String,
        },
        breakfast: [
            {
                type: String,
            }
        ],
        games: [
            {
                type: String,
            }
        ],
        watergames: {
            type: String,
        }
    }
});

module.exports = {
    Resort
};