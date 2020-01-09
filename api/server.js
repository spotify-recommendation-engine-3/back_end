const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const favesRouter = require('../faves/faves-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/faves', favesRouter);

server.get('/', (req, res) => {
    res.send("spotify-recommendation-engine-3 is ALIVE!");
});

module.exports = server;