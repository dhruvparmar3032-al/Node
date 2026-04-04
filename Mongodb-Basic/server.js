const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("server home page");
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
}); 


