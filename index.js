const express = require('express');

const port = process.env.port || 5000;
const server = require('./api/server');

server.use('/', (req, res) => {
    res.send(`API up and running on port ${port}`);
});

server.listen(port, ()=> console.log(`Server up and running on port ${port}`));