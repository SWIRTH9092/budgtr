require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require("morgan")  // import Morgan (logging middleware)
const PORT = process.env.POR || 3000; //(in case of env file missing)

// app.use(express.static(__dirname + '/public')); // this is how we add css to 
app.use(express.static(__dirname + '/public'))

// route get controller file

const budgets = require('./controllers/index');

app.use(budgets);


app.listen(PORT, () => {
    console.log("listening on port:" , PORT)
})