// import express
const express = require('express');

// import database
const db = require('./data/db.js');

//create a new http server
const server = express();

//middleware
server.use(express.json());


//----------  routes === endpoints  --------------





//the C in CRUD: CREATE

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
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        });
});


//the R in CRUD: READ
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: "The users information could not be retrieved." })
        );
});

//the R in CRUD: READ
server.get('/api/users/:id', (req, res) => {

    const userId = req.params.id;

    db
        .findById(userId)
        .then(user => {
            if (!user) {
            return res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved."});
        });
});


//the D in CRUD: DELETE


server.delete('/api/users/:id', (req, res) => {

    const userId = req.params.id;

    db
        .remove(userId)
        .then(deleted => {
            if (!deleted) {
            return res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            res.status(204).end();
        })
        .catch(err => res.status(500).json({ error: "The user could not be removed" }));
});


//the U in CRUD: UPDATE

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    if (!req.body.name || !req.body.bio) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }

    db
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The user information could not be modified." }));
});





//port number
server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
  });
