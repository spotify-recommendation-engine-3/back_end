const router = require('express').Router();

const Faves = require('./faves-model.js');

// router.get('/', restricted, (req, res) => {
//     Faves.find()
//         .then(users => {
//         res.json(users);
//     })
//     .catch(err => res.send(err));
// });


router.post('/',(req, res) => {
    let faveSong = req.body;

    Faves
    .addFave(faveSong)
    .then(song => {
        console.log(faveSong);
        res.status(201)
            .json(song);
    })
    .catch(error => {
        console.log(error)
        console.log(faveSong);
        res.status(500)
        .json({message: 'failed to add song'});
    });
});

router.get('/:id',(req,res)=>{
    const {id} = req.params;

    Faves
    .findAllMyFave(id)
    .then(songs => {
        res.json(songs)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        .json({ message: 'Failed to get songs' });
    });
})

module.exports = router;