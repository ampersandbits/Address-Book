var express = require("express");
var bodyParser = require("body-parser");
var app = express();
  
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
  
var contacts = [
    {firstname:"abc", lastname:"qwe", number:4437605137, city:"Crofton", id:1},
    {firstname:" dinesh",lastname:"namburi", number:8546584412, city:"new jersey", id:2},
    {firstname:"Dheeraj",lastname:"Batchu", number:6549876652, city:"Atlanta", id:3}
    ];
  
app.get("/", function(req,res){
   res.render("contacts",{contacts:contacts});
    //res.json(contacts);
});
  
app.get("/new", function(req, res) {
    res.render("new");
});
  
app.post("/",function(req,res){
     //console.log(req.body);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var number = req.body.number;
    var city = req.body.city;
    var newContact = {firstname : firstname, lastname : lastname, number : number, city : city};
    contacts.push(newContact);
    res.redirect("/");
  // res.send("ok");
});
  
app.get("/contact/:id", function(req,res){

    contact1 = contacts.filter(
        function(contacts){ return contacts.id == req.params.id }
    );
    //console.log(contact);
    if(contact1.length >0){
        res.render("show",{contact:contact1[0]});
    }
    else{
        console.log("Error");
    }
    /*contacts.find(contacts, function(err,contacts){
        if(err){
            console.log(err);
        } else{
            res.render("show",{contact:contacts});
        }
    })*/ 
    //console.log(req.params.id); 
});
// Edit
app.get("/contact/:id/edit", function(req,res){
    contact1 = contacts.filter(
        function(contacts){ return contacts.id == req.params.id}
    );
    if(contact1.length >0){
        res.render("edit",{contact:contact1[0]});
    } else{
        res.redirect("/");
    }
});

app.get("*", function(req,res){
    res.send("Page Error");
});

app.listen(3000, function(){
    console.log("Phone Book Server has started");
});
