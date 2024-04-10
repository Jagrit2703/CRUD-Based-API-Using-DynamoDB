const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));


app.use('/api', require('./routes/users'))
app.use('/api', require('./routes/company'))

// Test endpoint

app.get('/', (req, res) => {
    res.json('homepage!');
});


// Define your other routes and middleware here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
