const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const path = require('path')

const cors = require('cors');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
// DB
const connectDB = require('./config/db');
connectDB();

//CORS

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors());

//Template Engine

app.set('views',path.join(__dirname, '/views'));
app.set('view engine', 'ejs')

//Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})
