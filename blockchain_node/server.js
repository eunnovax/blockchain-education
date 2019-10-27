const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('MongoDB database connection established successfully');
});

const consensusRouter = require('./routes/broadcast');
app.use('/broadcast', consensusRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../blockchain_react/build/'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../blockchain_react', 'build', 'index.html')); //relative path
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});