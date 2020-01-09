const router = require('express').Router();

const Faves = require('./faves-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.post('/', restricted, (req, res) => {
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

router.get('/:id', restricted, (req,res)=>{
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

router.delete('/:userId/:trackId', restricted, (req,res)=>{
    const {userId} = req.params;
    const {trackId} = req.params;

    Faves
    .deleteFave(userId,trackId)
    .then(deleted => {
        if(deleted){
            res.json({removed: deleted})
        } else {
            res.status(404)
                .json({message: "Could not find track with that id"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500)
            .json({message:"Failed to delete track"})
    })
})
module.exports = router;