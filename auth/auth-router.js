const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');


// for endpoints beginning with /api/auth
router.post('/register', validateUser, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users
    .add(user)
    .then(saved => {
        res.status(201)
            .json(saved);
    })
    .catch(error => {
        console.log(error)
        res.status(500)
        .json(error);
    });
});

router.post('/login', validateUser, (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {

        const token = signedToken(user)
        
        res.status(200)
            .json({
            token,
            message: `Welcome ${user.username}!`,
            });
        } else {
        res.status(401)
            .json({ message: 'Invalid Credentials' });
            }
    })
    .catch(error => {
        res.status(500).json(error);
    });
});


function signedToken(user){

    const payload = {
    username: user.username
    };

    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

    const options = {
    expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options)
}

function validateUser(req, res, next){
    const user = req.body
    if(!Object.entries(req.body).length){
        return res
                .status(400)
                .json({message:'no request body attached'})
    }

    if(!('username' in user) || !('password' in user)){
        return res
                .status(400)
                .json({message:'username and password must be present'})
    }

    next();
}
module.exports = router;