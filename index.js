// import express
const express = require('express');

// import database
const db = require('./data/db.js');

//create a new http server
const server = express();

//middleware
server.use(express.json());


//----------  routes === endpoints  --------------





//the C in CRUD
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    const user = { name, bio };
    // axios.post(url, data === body)
    console.log('user', user);

    if (!name || !bio) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
    }
          
    db
        .insert(user)
        .then(user => {
            res.status(201).json({ success: true, user });
        })
        .catch(({ code, message }) => {
            res.status(code).json({ success: false, message });
        });
});









//the R in CRUD
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: "The users information could not be retrieved." })
        );
});

//the R in CRUD

server.get('/api/users:id', (req, res) => {
    const userId = req.params.id;

    db
        .findById(userId)
        .then(user => {
            res.status(200).json({ success: true, user});
        })
        .catch(err => {
            res.status(500).json({ success: false, error: "The user information could not be retrieved."});
        });
});






server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
  });
  