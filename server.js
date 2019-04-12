const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {
    ObjectID
} = require('mongodb');
var {
    Tour
} = require('./models/tour');
var {
    Resort
} = require('./models/resort');

mongoose.connect("mongodb://localhost/wildfire", {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

});

var app = express();

app.use(bodyParser.json());



/*---------------------------------------------------------------------------
                            Save Operations
------------------------------------------------------------------------------*/



//When user wants to tour
app.post('/tour', (req, res) => {
    var tour = new Tour({
        place: req.body.place,
        type: req.body.type,
        cost: {
            actual_cost: req.body.cost.actual_cost,
            discount_cost: req.body.cost.discount_cost
        },
        Itinerary: {
            welcome_drinks: req.body.Itinerary.welcome_drinks,
            breakfast: req.body.Itinerary.breakfast,
            games: req.body.Itinerary.games,
            watergames: req.body.Itinerary.watergames
        }
    });

    tour.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});



//When user wants to book resort
app.post('/resort', (req, res) => {
    var resort = new Resort({
        place: req.body.place,
        type: req.body.type,
        cost: {
            actual_cost: req.body.cost.actual_cost,
            discount_cost: req.body.cost.discount_cost
        },
        Itinerary: {
            Day1: req.body.Itinerary.Day1,
            Day2: req.body.Itinerary.Day2,
        }
    });

    resort.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});




/*---------------------------------------------------------------------------
                            Fetch Operations
------------------------------------------------------------------------------*/



//Tour Fetch
app.get('/tours', (req, res) => {
    Tour.find().then((tours) => {
        res.send({
            tours
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/tours/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Tour.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({
            tours
        });
    }).catch((e) => {
        res.status(400).send();
    });
});



//Resort Fetch
app.get('/resort', (req, res) => {
    Resort.find().then((tours) => {
        res.send({
            tours
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/resort/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Resort.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({
            tours
        });
    }).catch((e) => {
        res.status(400).send();
    });
});





/*---------------------------------------------------------------------------
                            Update Operations
------------------------------------------------------------------------------*/



//Tour Update
app.post('/tourUpdate/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['place', 'type', 'cost.actual_cost', 'cost.discount_cost', 'Itinerary.welcome_drinks', 'Itinerary.breakfast', 'Itinerary.games', 'Itinerary.watergames']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }


    Tour.findByIdAndUpdate(id, {
        $set: body
    }, {
        upsert: true
    }).then((tour) => {
        if (!tour) {
            return res.status(404).send();
        }

        res.send({
            tour
        });
    }).catch((e) => {
        res.status(400).send();
        console.log('Error', e)
    })


});

//Resort  Update
app.post('/resortUpdate/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['place', 'type', 'cost.actual_cost', 'cost.discount_cost', 'Itinerary.Day1', 'Itinerary.Day2']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }


    Resort.findByIdAndUpdate(id, {
        $set: body
    }, {
        upsert: true
    }).then((resort) => {
        if (!resort) {
            return res.status(404).send();
        }

        res.send({
            resort
        });
    }).catch((e) => {
        res.status(400).send();
        console.log('Error', e)
    })


});



app.listen(3000, () => {
    console.log(`Started up at port 3000`);
});