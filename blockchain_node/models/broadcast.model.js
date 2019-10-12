const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consensusSchema = new Schema(
    {
        
            
                blockNumber: {type: Number,  required: true},
                data: {type: String, required: true},
                nonce: {type: Number, required: true},
                previousBlockHash: {type: String, required: true},
                timestamp: {type: Number, required: true},
                hash: {type: String, required: true}
                
    },
    {
        timestamps: true
    }
);

const Consensus = mongoose.model('Consensus', consensusSchema);
module.exports = Consensus;