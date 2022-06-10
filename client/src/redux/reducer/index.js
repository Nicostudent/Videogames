import { GET_ALL_VIDEOGAMES, GET_BY_GENRE, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING, FILTER_BY_GENRE, GET_BY_DETAIL, SEARCH_BY_NAME, CREATE_VIDEOGAME, RESET_DETAIL, RESET_VIDEOGAMES } from '../actions'


const initialState = {
    videogames: [],
    AllVideoGames: [],
    gamesDetail: {},
    genresdb: [],       
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES: {
            return {
                ...state,
                videogames: action.payload,
                AllVideoGames: action.payload,               
            }        
        }
        case GET_BY_GENRE: {
            return {
                ...state,
                genresdb: action.payload
            }

        }
        case GET_BY_DETAIL: {
            return {
                ...state,
                gamesDetail : action.payload
            }
        }
        case FILTER_CREATED: {

            const fileredVideogames = state.AllVideoGames
            const cretedFilter = action.payload === 'created' ?
                fileredVideogames.filter(c => typeof c.id === "string") :
                fileredVideogames.filter(c => typeof c.id === "number")
          

            return {
                ...state,
                videogames: action.payload === 'all' ? fileredVideogames : cretedFilter
            }
        }
        case ORDER_BY_NAME: {
            
            let orderByName = action.payload === 'asc' ?
            state.videogames.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase() ) return 1;
                if(b.name.toLowerCase() > a.name.toLowerCase() ) return -1;
                return 0
            })                                         :            
            state.videogames.sort((a, b) => { 
                if(a.name.toLowerCase() > b.name.toLowerCase() ) return -1;
                if(b.name.toLowerCase() > a.name.toLowerCase() ) return 1;
                return 0;                
            }) 

            return {
                ...state,
                videogames : orderByName
            }
        }
        case ORDER_BY_RATING:{
            let orderByRating = action.payload === 'lessPopular' ?
            state.videogames.sort((a, b) =>{
                if(a.rating > b.rating) return 1
                if(b.rating > a.rating) return -1
                return 0
            }) :
            state.videogames.sort((a, b) => {
                if(a.rating > b.rating) return -1
                if(b.rating > a.rating) return 1
                return 0
            })
            return {
                ...state,
                videogames : orderByRating
            }
        }
        
        case FILTER_BY_GENRE:{
                 const allvideosGenre = state.AllVideoGames
               
                let axu = []
                  if(action.payload) {
                        allvideosGenre.forEach(el =>{
                            if(!el.genres[0].hasOwnProperty('name')){
                                if(el.genres.includes(action.payload)) axu.push(el)
                            }else if(el.genres && el.genres[0].hasOwnProperty('name')){
                                el.genres.map(c => {
                                    if(c.name.includes(action.payload)) axu.push(el)
                                })
                            }
                        })
                  }
             
                       
            return{
                ...state,
               videogames:  action.payload === "all" ? allvideosGenre : axu
            }
        } 
        case SEARCH_BY_NAME:{
            return{
                ...state,
                videogames: action.payload
            }
        }
        case CREATE_VIDEOGAME:{
            return {
                ...state               
            }
        }
        case RESET_DETAIL:{
            return {
                ...state,
                gamesDetail : action.payload
            }
        }  
        case RESET_VIDEOGAMES:{
            return{
                ...state,
                videogames: action.payload
            }
        }
        
        default: return state
    }
}

export default rootReducer
