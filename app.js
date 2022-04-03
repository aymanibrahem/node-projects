const express = require("express");
const app = express();
const port = process.env.PORT||3000;

app.get('/',(req, res) =>  {
    console.log("request riseved");
    res.send("Hi...");
});

app.listen(port, () => {
    console.log(`app listining on port ${port}`);
});
console.log("hi");