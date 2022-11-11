     
//get the express package
const express = require('express'); 

// Update the location of the data array
const Budget = require('../models/budget'); 

// for ejs-helpers 
const helpers = require("./ejs-helpers.js")

//(instead of app=express)
const router = express.Router(); 


// HOME ROUTE - Just redirects you to budgets index for now
router.get("/", (req, res) => res.redirect("/budgets"))

// INDEX ROUTE - GET to / - Returns all Budget Items
router.get('/budgets', (req,res) => {
    // res.render(template, data)
    res.render(
        'index.ejs',
        {
            allBudgetItems:Budget
        }
    );
});

router.get('/budgets/new', (req,res) => {
    res.send(`<h1>Get Worked from index file</h1>`)
})  

router.post('/budgets', (req,res) => {
    res.send(`<h1>Get Worked from index file</h1>`)
})  

//SHOW ROUTE - GET to /budgets - Returns a single budget
router.get("/budgets/:index", (req, res) => {
    // res.render(template, data)
    res.render("show.ejs", {
      budgetItem: Budget[req.params.index],
      index: req.params.index,  
      helpers  
    });
  });
  
//making this router exportable
module.exports = router; 