//*************************************** */ 
// Import Dependencies
// Bringing in Libraries or Assets exported by others files into this file
//*************************************** */
require("dotenv").config();          // load variables from .env into process.env
const PORT = process.env.POR || 3000; //(in case of env file missing)
const express = require('express');  // backend framework
const morgan = require("morgan")      // import Morgan (logging middleware)
const methodOverride = require("method-override") // import method override

//*************************************** */
// Create the Express App object
// All Middleware and Routes must be registered with App
// App tracks all the things the app does when a request is received
//*************************************** */
const app = express();

//register middleware with the app - Middleware are just functions that handle the request and response object before the routes do
app.use("/budgets", express.urlencoded({extended: true})) 
app.use(morgan("tiny"))  // logging middleware
app.use(methodOverride("_method")) // swap the method if the url has a ?_method=XXX query
app.use(express.static(__dirname + '/public')); // it's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css

//*************************************** */
// Routes and Routers
// These determine how diffent requests are responded to
// They are matched pased on path (/path) and method (GET/POST/PUT/DELETE)
//*************************************** */

// route get controller file
const budgets = require('./controllers/index');

//*************************************** */
// The Server Listener
// This turns on the server to listen for a requests on a particular port
//*************************************** */
app.use(budgets);

//*************************************** */
// The Server Listener
// This turns on the server to listen for a requests on a particular port
//*************************************** */
app.listen(PORT, () => {
    console.log("listening on port:" , PORT)
})