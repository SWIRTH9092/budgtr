     
//get the express package
const express = require('express'); 

//get MethodOverride Package
const methodOverride = require("method-override") // import method override

// Update the location of the data array
const Budget = require('../models/budget'); 

// for ejs-helpers 
const helpers = require("./ejs-helpers.js")

//(instead of app=express)
const router = express.Router(); 
router.use("/budgets", express.urlencoded({extended: true})) 

//Method over-ride
router.use(methodOverride("_method")) // swap the method if the url has a ?_method=XXX query

router.use(express.static(__dirname + '../public')); // it's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css

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

// NEW ROUTE - GET to / - displays form to get new budget Item
router.get('/budgets/new', (req,res) => {
    res.render("new.ejs", {
        helpers  
      });
});  


// INDEX ROUTE - change get to post
router.post("/budgets", (req, res)=> {

    // convert amount from string to number
    let workAmount = 0;
    workAmount = parseInt(req.body.amount)
    req.body.amount = workAmount

    // convert tags to an array
    let workTags = [];
    workTags = req.body.tags.split(",")

    //removed leading and trailing spaces from array element
    workTags = workTags.map (function (el){
        return el.trim();
    });
    req.body.tags = workTags
    Budget.push(req.body)

    // redirect back to index page
    res.redirect("/budgets")
});

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