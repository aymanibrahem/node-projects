const express = require("express");
const app = express();
const port = process.env.PORT||3000;
const Students = [
    {name: 'Ali', dept: 'PD', id: 1},
    {name: 'Nour', dept: 'SA', id: 2},
    {name: 'Mona', dept: 'MD', id: 3},
    {name: 'sara', dept: 'SAP', id: 4},
    {name: 'Mostafa', dept: 'EB', id: 5},
    {name: 'Ahmed', dept: 'GD', id: 1},
    {name: 'Noha', dept: 'GA', id: 2},
];


app.get('/',(req, res) =>  {
    console.log("request riseved");
    res.send("Hi...");
});

//Request all students
app.get("/api/Students",(req,res)=>{
    res.json(Students);
});

//Request student by id
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





app.listen(port, () => {
    console.log(`app listining on port ${port}`);
});
