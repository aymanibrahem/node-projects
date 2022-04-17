const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT||4000;
const names = [
    "Enaiat",
    "Mohamed Taha",
    "Ayman",
    "Ramadan",
    "Amr",
    "Sameh",
    "Mina",
    "Osama",
    "Bosy",
    "Ahmed Adel"
];



app.get('/',(req, res) =>  {
    console.log("request riseved");
    //res.send("Hi...");

    names.sort(() => Math.random() - 0.5);
    res.send(names);
    /* let i = 1;
    for (let name in names) {
        
        res.send(name);
    } */

});



app.listen(port, () => {
    console.log(`app listining on port ${port}`);
});
