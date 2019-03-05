//dependencies
var express = require("express");
var path = require("path");

//set up app
var PORT = process.env.PORT || 3000;
var app = express();

// Sets up the Express app to handle data parsing (just following the example)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//we will create dummy data to initialize the server info
var tables = [
    {
        customerName: "Jim",
        customerEmail: "jimdean@hotmail.com",
        customerID: "deanji01",
        phoneNumber: "000-000-0000"
    }
];

var reserved = [];

//create a table counter to figure out how many tables are in use
var tablesLen = tables.length;
var tablesLengthString = tablesLen.toString();

app.get('/app/tablesUsed', function(req, res) {
    res.send(tablesLengthString);
})

//our routes

//homepage and redirect to home from root
app.get('/', function(req, res) {
    res.redirect('/home')
});

//route to homepage
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"))
});

//route to page to add table
app.get('/addtable', function(req, res) {
    res.sendFile(path.join(__dirname, "/addTable.html"))
});

//send html list of tables
app.get('/tables', function(req,res) {
    res.sendFile(path.join(__dirname, "/allTables.html"))
});


//route to json table list
app.get('/api/tables', function(req,res) {
    res.json(tables)
});

//route to json reserved list
app.get('/api/reserved', function(req,res) {
    res.json(reserved)
});

//get request for a name search
app.get('/api/tables/:name', function(req, res) {
    var chosen = req.params.name;
    for (i = 0; i < tables.length; i++) {
        if (chosen === tables[i].customerName) {
            return res.json(tables[i]);
        }
    }
    return res.send("No customer here by that name, sorry!")
})

//route for post requests
app.post('/api/tables', function(req, res) {
    var newTable = req.body;
    //add the new table to our current list
    if (tablesLen < 5) {
        tables.push(newTable);

        //updating our table list
        tablesLen ++;
        tablesLengthString = tablesLen.toString();
    
        res.json(newTable);
    } else {
        reserved.push(newTable);
        res.json(newTable);
    }

})















//set up our application to listen
app.listen(PORT, function() {
    console.log("Your application is listening on port " + PORT)
});
