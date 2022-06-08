require('dotenv').config();
const axios = require('axios');

const {
    API_KEY
} = process.env;
const { Videogame, Genre } = require('../db.js')




const get_API_info = async () => {
    const apiGamesPageOne = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data
    const apiGamesPageTwo = (await axios.get(apiGamesPageOne.next)).data;
    const apiGamesPageThree = (await axios.get(apiGamesPageTwo.next)).data;
    const apiGamesPageFour = (await axios.get(apiGamesPageThree.next)).data;
    const apiGamesPageFive = (await axios.get(apiGamesPageFour.next)).data;

    const apiGamesAll=([
        ...apiGamesPageOne.results,
        ...apiGamesPageTwo.results,
        ...apiGamesPageThree.results,
        ...apiGamesPageFour.results,
        ...apiGamesPageFive.results]).map(c => {
            
        return {
            id: c.id,
            name: c.name,
            img: c.background_image,
            genres: c.genres.map(c => c.name),
            rating : c.rating,
            platforms: c.platforms.map(c => c.platform.name)
        }
    })

    return apiGamesAll
};

const get_DB_Info = async () => {
    return await Videogame.findAll({
        include: [{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }]
    })
};
/*
[ ] __GET /videogames__:
  - Obtener un listado de los videojuegos 
  - Debe devolver solo los datos necesarios para la ruta principal
*/

const get_All_VideoGames = async () => {
    let apiInfo = await get_API_info(),
        dbInfo = await get_DB_Info(),
        allInfo = apiInfo.concat(dbInfo)

    return allInfo
}

/* 
[] __GET /videogames?name="..."__:
  - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter  
  - Si no existe ningún videojuego mostrar un mensaje adecuado */

  const getGames = async (req,res, next)=>{
    const name = req.query.name
    const allGames = await get_All_VideoGames()
   try{
         if(name){
           const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
           const apiInfo = await apiUrl.data.results.map(e =>{
               return{
                   id: e.id,
                   name: e.name,
                   img: e.background_image,   
                   genres: e.genres.map(g => g.name),
                   rating : e.rating,
                   platforms: e.platforms.map(c => c.platform.name)
               }
           })           
           const dbInfo = await Videogame.findAll({               
              attributes: ['id', 'name', 'background_image'],
               include:{
                   model: Genre,
                   attributes: ['name'],
                   through: {
                     attributes: []
                   }
               }
           })           
           const variable = dbInfo.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
           
        
                const allGamesApi = [...variable, ...apiInfo]
                const allGamesApifirst = allGamesApi.slice(0,15);
                //console.log(allGamesApifirst)
           allGamesApifirst.length ? res.send(allGamesApifirst) : res.send('Games not found')
         }else{
             res.send(allGames)
         }
        
    }catch (error) {
                next(error)
            }
   }

/*
[ ] __GET /videogame/{idVideogame}__:
  - Obtener el detalle de un videojuego en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
 (imagen, nombre, y géneros)
  [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas --!> -->
  - Incluir los géneros asociados */

const getVideogamesId = async (req, res, next) => {
    const id = req.params.idVideogame
   
    try {       
        
        if (!id.includes('-')) {
        const paramsGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
          return  res.json({
                img: paramsGame.data.background_image,
                name: paramsGame.data.name,
                description: paramsGame.data.description,
                released: paramsGame.data.released,
                rating: paramsGame.data.rating,
                genres : paramsGame.data.genres,
                platforms: paramsGame.data.platforms.map(c => c.platform.name)
            }
            )
        } else {           
            // const dbInfo = await Videogame.findByPk(id)
            const videogameId = await Videogame.findByPk(id, { include: Genre });
            // const genreos = dbInfo.getGenres()
            // const objetocontodo = {               
            //      ...dbInfo.dataValues,
            //      genres : genreos.dataValues
            // }
            videogameId.name ? res.json(videogameId) : res.json('no')
        }
    } catch (error) {
        next(error)
       }


}
/*[ ] __GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 */
const getGenres =  async (req, res) => {
    const allGenres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.map(c => {
        return {
            name: c.name           
        }
    })
    
       await allGenres.forEach(c => Genre.findOrCreate({
            where: {
                name: c.name                
            }
        }))

    const genresDb = await Genre.findAll()
    res.json(genresDb)  
}

/*- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos */
  const postGame = async (req, res) => {
  
    const { name, description, released, rating, platforms, background_image, genres } = req.body;
    if( !name || !description || !platforms ) res.status(400).json({msg:"Missing data"});
    try {
        const createdGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            background_image         
        });
        
        const searchGenre = await Genre.findAll({
            where: {
              name: genres,
            },
          });

        createdGame.addGenre(searchGenre);
               
        res.status(200).send({ message: "Successfully created" });
      } catch (error) {
        next(error)
      } 
    };

const deleteVideogame =  async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            Videogame.destroy({
                where: {
                    id: id
                }
            })
            res.json('your Videogame was destroyed')
        }

    } catch (error) {
        next(error)
    }
}

const updateVideogame = async (req, res, next) => {
    const { id } = req.params
    try {
        if (id) {
            const { name } = req.body
            await Videogame.update({ name }, { where: { id: id } })
            res.send("You get the new Name!")
        } else {
            res.send("you can't get a new name")
        }
    } catch (error) {
        next(error)
    }
}

module.exports ={
    get_All_VideoGames,
    get_DB_Info,
    get_API_info,
    getGenres,
    getGames,
    getVideogamesId,
    postGame,
    deleteVideogame,
    updateVideogame
}