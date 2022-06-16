const { Router } = require('express');
require('dotenv').config();
const axios = require('axios')
const {
    API_KEY
} = process.env;


const router = Router();

const { getVideogames,
        getGenres,
        getGames,
        getVideogamesId,
        postGame,     
        createNewGenre,   
    } = require('./controlers')




router.get('/videogames', getGames)
router.get('/genres',getGenres)
router.get('/videogames/:idVideogame', getVideogamesId )
router.post('/videogames', postGame)
router.post('/addgenre', createNewGenre)





module.exports = router;
