const express = require('express');
const morgan = require('morgan')
const path = require('path')


//Start express app
const app = express();


// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Development debugging

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json({
    limit: '10kb'
}))

module.exports = app;