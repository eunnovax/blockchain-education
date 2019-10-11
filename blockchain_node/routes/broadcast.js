const router = require('express').Router();
let Broadcast = require('../models/broadcast.model');

router.route('/').get((req, res) => {
    Broadcast.find()
    .then(broadcast => res.json(broadcast))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const blockchain = req.body.blockchain;
    const title = blockchain.title;
    const nodes = blockchain.nodes;
    const chainId = blockchain.chainId;
    const chain = blockchain.chain;
     
    const newChain = new Broadcast({
      title,
      nodes,
      chainId,
      chain
    });
    //consensus algorithm
    newChain
    .save()
    .then(() => res.json('Network updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
});