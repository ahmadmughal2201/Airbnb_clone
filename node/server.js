const express = require("express");
const app = express();
const PORT = 3001;
const bodyparser = require("body-parser");
require('./utils/db');
const userRouter = require('./routes/userRoutes');
const roomRouter = require('./routes/roomRoutes');
const managerRoom = require('./routes/managerRoomRoutes');

const cors = require('cors');

app.use(cors());

// Middleware
app.use(bodyparser.json());

// Starter routes
app.use('/api', userRouter);
app.use('/api', roomRouter);
app.use('/api', managerRoom);


app.get('/welcome', (req, res) => {
    res.send("Welcome: Alishba");
})

app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
})
