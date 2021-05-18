const express = require("express");
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("server is running..."));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.send("Welcome To Node JS"));

let users = [
    {id: 1, name: "PHEARAK_ENG", password: "0000"},
    {id: 2, name: "PALLY_CHUN", password: "1111"},
    {id: 3, name: "THY_NHORK", password: "2222"}
]

// ==========================| HOW TO USE GET |========================== //
app.get("/api/users", (req, res) => res.send(users));

// Want one user //
app.get("/api/users/:id", (req, res) => {
    // findIndex() //
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id)); 
    if (index >= 0) {
        let user = users[index];
        res.send(user);
    }else {
        res.status(404)
        res.send({error: "user id not found!"})
    }
});

// ==========================|  HOW TO USE POST |========================== //
app.post("/api/users", (req, res) => {
    if (!req.body.password) {
        res.status(404)
        return res.send({error: "Password Require..."})
    }
    let user = {
        is: users.length + 1,
        name: req.body.name,
        password: req.body.password
    }
    users.push(user);
    res.send(users);
});

// GET: view //
// POST: Create //
// PUT: Update //
// DELETE: Delete //

// ==========================| HOW TO USE PUT |========================== //
app.put("/api/users/:id", (req, res) => {
    // findIndex() //
    let id = req.params.id;
    let username = req.body.name;
    let pass = req.body.password;

    let index = users.findIndex(user => user.id === parseInt(id)); 
    if (index >= 0) {
        let user = users[index];
        user.name = username;
        user.password = pass;
        res.send(user);
    }else {
        res.status(404)
        res.send({error: "user id not found!"})
    }
});

// ==========================| HOW TO USE DELETE |========================== //
app.delete("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index >= 0) {
        users.splice(index, 1);
        res.send({message: "successfuly"})
    }else {
        res.status(404)
        res.send({error: "user id not found!"})
    }
});