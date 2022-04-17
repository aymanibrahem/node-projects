const path = require("path");
const express = require("express");
const app = express();

//--------------------------------------------------
//Sart Validation-----------------------------------

const Ajv = require("ajv");


const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type":"string",
            "pattern":"^[A-Z][a-z]*$",
        },
        "dept": {
            "type":"string",
            "enum":["SD","SA","MD"],
            "maxLength":2,
            "minLength":2,
        }  
    },
    "required":["name", "dept"],
        "maxProperties":2,
        "minProperties":2,
};

const ajv = new Ajv();

let validator = ajv.compile(schema);

//End Validation ------------------------------------
//---------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT||3000;
const Students = [
    {name: 'Ali', dept: 'PD', id: 1},
    {name: 'Nour', dept: 'SA', id: 2},
    {name: 'Mona', dept: 'MD', id: 3},
    {name: 'sara', dept: 'SAP', id: 4},
    {name: 'Mostafa', dept: 'EB', id: 5},
    {name: 'Ahmed', dept: 'GD', id: 6},
    {name: 'Noha', dept: 'GA', id: 7},
];


app.get('/',(req, res) =>  {
    console.log("request riseved");
    //res.send("Hi...");
    res.sendFile(path.join(__dirname, "/main.html"));
});


//Query string
app.get('/welcome.html', (req, res)=>{
    console.log(req.query);
    console.log(req.query.fnm);
    console.log(req.query.lnm);
    res.sendFile(path.join(__dirname, "/welcome.html"));

})

//Request all students
app.get("/api/Students",(req,res)=>{
    res.set("Access-Control-Allow-origin", "*"); //Testing REST API Using postwoman online (cros)
    res.json(Students);
});

//REQ body
app.post('/welcome.html', (req, res) => {
    console.log(req.body);
    res.send(`Thanks ${req.body.fnm} ${req.body.lnm} for sending required data`);
})

//Request student by id
//passing data from client to server via url parametrs
app.get("/api/Students/:id",(req,res)=>{
    let id = req.params.id;
    const std = Students.find((val, idx, arr)=> {
        return val.id == id;
    })

    if(std){
        res.json(std);
    }else{
        res.send("Not Found");
    } 
});


//create new student
app.post("/api/Students" , (req ,res) => {
    let valid = validator(req.body);
    if(valid){
        req.body.id = Students.length+1;
        Students.push(req.body);
        res.json(req.body);
    }else{
        res.status(403).send("forbidden command");

    }
    
});

//Delete existing Student 
app.delete("/api/Students/:id", (req, res) => {
    let idx = Students.findIndex((val)=>{return val.id == req.params.id});
    if(idx!=-1){
        /* let deleteStd = */ Students.splice(idx, 1);
        res.send("one element affected");
    }else{
        res.send("student not found");
    }
});

//Update for studen data
app.put("/api/Students/:id", (req, res) => {
    let idx = Students.findIndex((val)=>{return val.id == req.params.id});
    if(idx!=-1){
        for (i in req.body ) {
            Students[idx][i] = req.body[i]
        }
        res.json(Students[idx]);
        
    }else{
        res.send("student not found .. update is not allowed");
    }
});




app.listen(port, () => {
    console.log(`app listining on port ${port}`);
});
