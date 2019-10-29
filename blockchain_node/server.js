const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
// const csp = require('helmet-csp')


const app = express();
const port = process.env.PORT || 5000;

// app.use(csp({
//     // Specify directives as normal.
//     directives: {
//       defaultSrc: ["'self'", 'default.com'],
//       scriptSrc: ["'self'", "'unsafe-inline'"],
//       styleSrc: ['style.com'],
//       fontSrc: ["'self'", 'fonts.com'],
//       imgSrc: ['img.com', 'data:'],
//       sandbox: ['allow-forms', 'allow-scripts'],
//       reportUri: '/report-violation',
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: true,
//       workerSrc: false  // This is not set.
//     },
  
//     // This module will detect common mistakes in your directives and throw errors
//     // if it finds any. To disable this, enable "loose mode".
//     loose: false,
  
//     // Set to true if you only want browsers to report errors, not block them.
//     // You may also set this to a function(req, res) in order to decide dynamically
//     // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
//     reportOnly: false,
  
//     // Set to true if you want to blindly set all headers: Content-Security-Policy,
//     // X-WebKit-CSP, and X-Content-Security-Policy.
//     setAllHeaders: false,
  
//     // Set to true if you want to disable CSP on Android where it can be buggy.
//     disableAndroid: false,
  
//     // Set to false if you want to completely disable any user-agent sniffing.
//     // This may make the headers less compatible but it will be much faster.
//     // This defaults to `true`.
//     browserSniff: true
//   }))
  
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
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});