//*************************************** */ 
// Import Dependencies
// Bringing in Libraries or Assets exported by others files into this file
//*************************************** */
require("dotenv").config();          // load variables from .env into process.env
const PORT = process.env.POR || 3000; //(in case of env file missing)
// const methodOverride = require("method-override") // import method override
const express = require('express');  // backend framework
const morgan = require("morgan")      // import Morgan (logging middleware)


//*************************************** */
// Create the Express App object
// All Middleware and Routes must be registered with App
// App tracks all the things the app does when a request is received
//*************************************** */
const app = express();

//register middleware with the app - Middleware are just functions that handle the request and response object before the routes do
app.use("/budgets", express.urlencoded({extended: true})) 
app.use(morgan("tiny"))  // logging middleware

// route get controller file
const budgets = require('./controllers/index');

//*************************************** */
// Reroutes to conroller file
//*************************************** */
app.use(budgets);


//*************************************** */
// The Server Listener
// This turns on the server to listen for a requests on a particular port
//*************************************** */
app.listen(PORT, () => {
    console.log("listening on port:" , PORT)
})