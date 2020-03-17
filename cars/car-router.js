const express = require('express');
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './cars.db3'
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get('/', (req, res) => {
    db('cars-table')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: error, message: "Error while retrieving cars"});
        });
});

router.get('/:id', validateId, (req, res) => {
    const id = req.params.id;
    db('cars-table').where({id: id}).first()
        .then(response => {
            console.log(response);
            if (response !== undefined) {
                res.status(200).json(response);
            } else {
                res.status(500).json({message: `Error while retrieving the car with id ${id}`})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: `Error while retrieving the car with id ${id}`});
        });
});

router.post('/', validateBody([ 'make', 'model', 'mileage']), (req, res) => {
    db('cars-table').insert(req.body)
        .then(response => {
            console.log(response);
            db('cars-table').where({id: response[0]}).first()
                .then(newResponse => {
                    console.log(newResponse);
                    res.status(201).json(newResponse);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err, message: `Error after inserting new car and retrieving it as id ${id}`});
                });    
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: "Error while inserting new car"});
        });
});

router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id;
    db('cars-table').where({id: id}).del()
        .then(response => {
            console.log(response);
            if (response === 1) {
                db('cars-table')
                    .then(newResponse => {
                        res.status(200).json(newResponse);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: error, message: `Error while retrieving cars after deleting car with id ${id}`});
                    });
            } else {
                res.status(500).json({message: `Error while deleting car with id ${id}`});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: `Error while deleting car with id ${id}`});
        });
});

router.put('/:id', validateId, (req, res) => {
    const id = req.params.id;
    db('cars-table').where({id: id}).update(req.body)
        .then(response => {
            if (response === 1) {
                db('cars-table').where({id: id}).first()
                    .then(newResponse => {
                        res.status(200).json(newResponse);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: error, message: `Error while retrieving car after updating car with id ${id}`});
                    });
                } else {
                    res.status(500).json({error: err, message: `Error while updating car with id ${id}`});
                }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: `Error while updating car with id ${id}`});
        });
});

function validateBody(fields) {
    // remember, fields must be an array
    return function(req, res, next) {
        for (let i=0; i<fields.length; i++) {
            let field = fields[i];
            if (!req.body[field]) {
                res.status(400).json({message: `Submission is missing ${field}`})
            }
        }
        next();
    };
};

function validateId(req, res, next) {
    const id = req.params.id;
    db('cars-table').where({id: id}).first()
        .then(response => {
            if (response !== undefined) {
                next();
            } else {
                res.status(500).json({message: `Unable to retrieve car with id ${id}`});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: `Unable to retrieve car with id ${id}`});
        });
}

module.exports = router;