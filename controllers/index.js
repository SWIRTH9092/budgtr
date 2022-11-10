     
//get the express package
const express = require('express'); 

// Update the location of the data - Change Xxxxxx to be the name of the array.js file in models
const Budget = require('../models/budget'); 

//(instead of app=express)
const router = express.Router(); 

// INDEX ROUTE - GET to / - Returns all Budget Items
router.get('/', (req,res) => {
    // res.render(template, data)
    res.render(
        'index.ejs',
        {
            allBudgetItems:Budget
        }
    );
});

router.get('/budgets', (req,res) => {
    res.send(`<h1>Get Worked from index file</h1>`)
})  

router.get('/budgets/:index', (req,res) => {
    res.send(`<h1>Get Worked from index file</h1>`)
})  

router.get('/budgets/new', (req,res) => {
    res.send(`<h1>Get Worked from index file</h1>`)
})  

router.post('/budgets', (req,res) => {
    res.send(`<h1>Get Worked from index file</h1>`)
})  

//making this router exportable
module.exports = router; 