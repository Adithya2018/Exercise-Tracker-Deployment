const express = require('express');
const mongoose = require('mongoose');  // this will help us to connect to mongoDB database
const cors = require('cors');
const path = require('path');

require('dotenv').config();

// Express server
const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

// serve static assets if in productiion
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('../frontend/mern-exercise-tracker/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..','frontend','mern-exercise-tracker','build','index.html'));
    });
}

const port = process.env.PORT || 5000;

// now let's start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

