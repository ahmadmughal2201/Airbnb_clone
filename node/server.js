const express = require("express");
const app = express();
const PORT = 3001;
const bodyparser = require("body-parser");
require('./utils/db');
const productRouter = require('./routes/userRoutes');

// Middleware
app.use(bodyparser.json());

// Starter routes
app.use('/api', productRouter);


app.get('/welcome', (req, res) => {
    res.send("Welcome: Alishba");
})

app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
})
