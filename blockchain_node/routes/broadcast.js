const router = require('express').Router();
let Broadcast = require('../models/broadcast.model');

router.route('/').get((req, res) => {
    Broadcast.find()
    .then(broadcast => res.json(broadcast))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const blockNumber = req.body.blockNumber;
    const data = req.body.data;
    const nonce = req.body.nonce;
    const previousBlockHash = req.body.previousBlockHash;
    const timestamp = req.body.timestamp;
    const hash = req.body.hash;
     
    const newChain = new Broadcast({
      blockNumber,
      data,
      nonce,
      previousBlockHash,
      timestamp,
      hash
    });
    //consensus algorithm
    newChain
    .save()
    .then(() => res.json('Network updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;