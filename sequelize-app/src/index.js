const express = require('express');
const db = require('../models/index')
const app = express();

const User = db.users;

app.use(express.json());
app.post('/users', (req, res) => {
    const { firstName, lastName, hasCar } = req.body;
    const user = { firstName: firstName, lastName: lastName, hasCar: hasCar };
    
    User.create(user)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.',
    }))
})
app.get('/users', (req, res) => {
    User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).send({ message: err.message || 'Some error occurred while getting all users.' }));
})
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
    .then((user) => {
        if(user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).send({ message: `User not found with userid : ${id}`});
        }
    })
    .catch((err) => res.status(500).send({ message: err.message || 'Some error occurred while getting the user.' }));
})
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: {
            id: id
        }
    })
    .then((result) => {
        if(result[0] === 1) {
            res.status(200).send("sucessfully updated");
        }
        else {
            res.status(404).send(`User not found with userid : ${id}`);
        }
        
    })
    .catch((err) => res.status(500).send({ message: err.message || "Some error occurred while updating the user." }));
})
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: {
            id: id
        }
    })
    .then((result) => {
        // [1] == 1 (true) [1] === 1 (false)
        if(result == 1) {
            res.status(200).send("sucessfully deleted");
        }
        else {
            res.status(404).send(`User not found with userid : ${id}`);
        }
    })
    .catch((err) => res.status(500).send({ message: `Could not delete the user with id=${id}.` }));
});

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));