const express= require("express");
const app=express();

const port=8080;

app.set("view engine","ejs");
app.use(express.json());

const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

const path= require("path");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

//Server running
app.listen(port,()=>{
    console.log(`Server ${port} is working successfully!`);
});

//home page
app.get("/home",(req,res)=>{
    res.render("home.ejs");
});

//services page
app.get("/services",(req,res)=>{
    res.render("services.ejs");
});

//about page
app.get("/about",(req,res)=>{
    res.render("about.ejs");
});

//resources page
app.get("/resources",(req,res)=>{
    res.render("resources.ejs");
});

//contact page
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});

//appointment page
app.get("/appointment",(req,res)=>{
    res.render("appointment.ejs");
});


//connection between appointment and database 1
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    database: "healthcare",
    password:"1032"
});

app.post("/appointment",(req,res)=>{
    let id = Math.floor((Math.random()*10000))+900;
    let{name,email,phone,appointment_date,doctor} = req.body;
    console.log(req.body); 
    let q="INSERT INTO CAREDATA (NAME,EMAIL,PHONE,APPOINTMENT_DATE,DOCTOR,ID) VALUES (?)";
    try{
        connection.query(q,[[name,email,phone,appointment_date,doctor,id]],(err,result)=>{
            if (err) throw err;
            res.render("success.ejs");
        });
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
});

//Login Page

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

//login post request
app.post("/login",(req,res)=>{
    let {email,password}= req.body;

    if({email,password}){
        if(email==="healthcareplus@gmail.com" && password==="1032"){
            res.render("screen.ejs");
        }
        else{
            res.render("incorrect.ejs");
        }
    }
});
app.post("/login/screen-success",(req,res)=>{
    res.render("screen.ejs");
})
//connection between timetable and database 2
const connection1 = mysql.createConnection({
    host:"localhost",
    user: "root",
    database: "TT",
    password:"1032"
});

app.get("/login/timetable",(req,res)=>{
    let q = "SELECT * FROM TIMETABLE";
    try{
        connection1.query(q,(err,result)=>{
            if(err) throw err;
            res.render("timetable.ejs",{result});
        })
    }catch(err){
        console.log(err);
    }
})

//connection between booking and database 3
let mysql2 = require("mysql2");
const connection2 = mysql2.createConnection({
    host:"localhost",
    user: "root",
    database: "healthcare",
    password:"1032"
});

app.get("/login/booking",(req,res)=>{
    let q = "SELECT * FROM CAREDATA";
    try{
        connection2.query(q,(err,result)=>{
            if(err) throw err;
            res.render("booking.ejs",{result});
        })
    }catch(err){
        console.log(err);
    }
})

//Logout statement
app.get("/logout-successfully",(req,res)=>{
    res.render("logout.ejs");
});

app.get("/login/billing",(req,res)=>{
    res.render("billing.ejs");
});


//Billing Database
let mysql4 = require("mysql2");
const connection4 = mysql4.createConnection({
    host:"localhost",
    user: "root",
    database: "billingdata",
    password:"1032"
});

app.post("/login/billing",(req,res)=>{
    let id = Math.floor(Math.random()*10000000);
    let{name,age,gender,number_of_days,email,contact_number,medicines_name,amount} = req.body;

    let q4="INSERT INTO BILLDATA (NAME,AGE,GENDER,NUMBER_OF_DAYS,EMAIL,CONTACT_NUMBER,MEDICINES_NAME,AMOUNT,ID) VALUES (?)";
    try{
        connection4.query(q4,[[name,age,gender,number_of_days,email,contact_number,medicines_name,amount,id]],(err,result)=>{
            if (err) throw err;
            res.render("billdone.ejs");
        });
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
});

//Show Bills & Receipts

app.get("/login/showbills",(req,res)=>{
    let q5 = "SELECT * FROM BILLDATA";
    try{
        connection4.query(q5,(err,result)=>{
            res.render("showbill.ejs",{result});
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

//donate page
app.get("/donate",(req,res)=>{
    res.render("donate.ejs");
});

//Volunteer Page

app.get("/volunteer-Form",(req,res)=>{
    res.render("volunteer.ejs");
});

//Volunteer Database

let mysql5 = require("mysql2");
const connection5 = mysql5.createConnection({
    host:"localhost",
    user: "root",
    database: "volunteer",
    password:"1032"
});

app.post("/volunteer-Form",(req,res)=>{
    let id = Math.floor(Math.random()*100000);
    let{name,email,contact,skills,availability} = req.body;

    let q5="INSERT INTO VDATA (NAME,EMAIL,CONTACT,SKILLS,AVAILABILITY,ID) VALUES (?)";
    try{
        connection5.query(q5,[[name,email,contact,skills,availability,id]],(err,result)=>{
            if (err) throw err;
            res.render("volunteer-success.ejs");
        });
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
});

app.get("/login/showvolunteer",(req,res)=>{
    let q = "SELECT * FROM VDATA";
    try{
        connection5.query(q,(err,result)=>{
            if (err) throw err;
            res.render("showvolunteer.ejs",{result});
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

//Edit Route 
app.get("/login/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q6 = `SELECT*FROM VDATA WHERE ID = ${id}`;
    try{
        connection5.query(q6,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            res.render("showuser.ejs",{user});
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

//Update Route

app.patch("/login/:id",(req,res)=>{
    let {id}= req.params;
    let q6 = `SELECT*FROM VDATA WHERE ID = ${id}`;
    try{
        connection5.query(q6,(err,result)=>{
            if(err) throw err;
            let q7 = `UPDATE VDATA SET STATUS="APPROVED" WHERE ID = ${id}`;
            try{
                connection5.query(q7,(err,result)=>{
                    if(err) throw err;
                    res.redirect("/login/showvolunteer");
                })
            }catch(err){
                res.send("Error Occured in Database Please Try again after some time!");
            }
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

//Show Volunteer's List

app.get("/showlist",(req,res)=>{
    let q8=`SELECT ID,NAME,EMAIL,AVAILABILITY FROM VDATA WHERE STATUS="APPROVED"`;
    try{
        connection5.query(q8,(err,result)=>{
            if(err) throw err;
            res.render("showlist.ejs",{result});
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

//Donate Request
app.get("/blood-donate",(req,res)=>{
    res.render("blood.ejs");
})
app.post("/blood-donate",(req,res)=>{
    let id = Math.floor((Math.random()*1000000)+900);
    let {name,age,blood,email,contact,availability} = req.body;
    let q9 = "INSERT INTO BLOOD (NAME,AGE,BLOOD,EMAIL,CONTACT,AVAILABILITY,ID) VALUES(?)";
    try{
        connection.query(q9,[[name,age,blood,email,contact,availability,id]],(err,result)=>{
            if(err) throw err;
            res.render("success1.ejs");
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

app.get("/blood-donatelist",(req,res)=>{
    let q10 = "SELECT*FROM BLOOD";
    try{
        connection.query(q10,(err,result)=>{
            if(err) throw err;
            res.render("donatelist.ejs",{result});
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

//Edit Page
app.get("/donate/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q11 = `SELECT*FROM BLOOD WHERE ID='${id}'`;
    try{
        connection.query(q11,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            res.render("donoredit.ejs",{user});
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

//Update Page

app.patch("/donate/:id",(req,res)=>{
    let {id} = req.params;
    let q13 = `UPDATE BLOOD SET STATUS="DONATED" WHERE ID = '${id}'`;
    try{
        connection.query(q13,(err,result)=>{
            if(err) throw err;
            res.redirect("/blood-donatelist");
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})

app.get("/donate-certicate",(req,res)=>{
    let q14= `SELECT ID,NAME,AGE,BLOOD FROM BLOOD WHERE STATUS="DONATED"`;
    try{
        connection.query(q14,(err,result)=>{
            if(err) throw err;
            res.render("certificatelist.ejs",{result});
        })
    }catch(err){
        res.send("Error Occured in Database Please Try again after some time!");
    }
})