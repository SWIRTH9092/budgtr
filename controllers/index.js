     
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

router.use("/static", express.static("public")) // it's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css

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

// New Route - Get to /budgets/new - render a page with a form to create a new thing
router.get('/budgets/new', (req,res) => {
    res.render("new.ejs", {
        helpers  
      });
});  


//new route - post to /budgets - receive data from the data from the form and create a new budget item then redirect the user back to index
router.post("/budgets", (req, res)=> {

    // convert amount from string to number
    let workAmount = 0;
    if (!req.body.amount) {
        workAmount = 0
     }  else{
        workAmount = parseInt(req.body.amount)
     }
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


// EDIT route = GET to /budgets/:index/edit - render a form to edit the budget item
router.get("/budgets/:index/edit", (req, res) => {
    // render edit.ejs with the existing budget data
    res.render("edit.ejs", {
        budgetItem: Budget[req.params.index],
        index: req.params.index,
        helpers
    })
 })

// update route = PUT to /budgets/:index - update the Budget with info from a form

router.put("/budgets/:index", (req, res) => {
 
 // convert amount from string to number
 let workAmount = 0;
 if (!req.body.amount) {
    workAmount = 0
 }  else{
    workAmount = parseInt(req.body.amount)
 }

 req.body.amount = workAmount

 // convert tags to an array
 let workTags = [];
 workTags = req.body.tags.split(",")

 //removed leading and trailing spaces from array element
 workTags = workTags.map (function (el){
     return el.trim();
 });
 req.body.tags = workTags
    
 // updating Budget
    Budget[req.params.index] = req.body

// redirect user back to index
    res.redirect("/budgets")
  })
 
  

// DESTROY Route - DELETE to /budgets/:index - deletes the specified
router.delete("/budgets/:index", (req, res) => {
    //splice the item out of the array
    Budget.splice(req.params.index, 1)
    // redirect user back to index
    res.redirect("/Budgets")  
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