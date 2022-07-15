const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

process.on('uncaughtException', err=>{
    console.log('UNCAUGHT EXCEPTION! Shutting down');
    console.log(err.name, err.message);

    process.exit(1)
})

dotenv.config({
    path: './config.env',
   
})


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
//connect to the database
mongoose.connect('DB',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(()=> console.log('DB connection successfull!'))

const port = process.env.PORT || 8000;

const server = app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})