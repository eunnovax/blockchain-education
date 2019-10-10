const router = require('express').Router();
let Broadcast = require('../models/broadcast.model');

router.route('/').get((req, res) => {
    Broadcast.find()
    .then(broadcast => res.json(broadcast))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const network = req.body.network;

    //consensus algorithm
    newNetwork
    .save()
    .then(() => res.json('Network updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
});