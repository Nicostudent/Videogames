import axios from 'axios'
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_BY_GENRE = 'GET_BY_GENRE'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const GET_BY_DETAIL = 'GET_BY_DETAIL'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const RESET_DETAIL = 'RESET_DETAIL'

export function get_all_videogames (){
    return async function (dispatch){
         await axios.get('/videogames')
        
        .then(res => dispatch({
            type: GET_ALL_VIDEOGAMES, payload: res.data
        }))
    }
}

export function get_by_genre (){
    return async function (dispatch){
         await axios.get('/genres')
        
        .then(res => dispatch({
            type: GET_BY_GENRE, payload: res.data
        }))
    }
}

export function filter_created (payload){
    return{
        type: FILTER_CREATED,
        payload 
    }
}
export function order_name (payload){
    return{
        type: ORDER_BY_NAME,
        payload 
    }
}
export function order_rating (payload){
    return{
        type: ORDER_BY_RATING,
        payload 
    }
}

export function filter_genre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}



export function get_videgames_detail (id){
    return async function (dispatch){
         await axios.get(`/videogames/${id}`)
        
        .then(res => dispatch({
            type: GET_BY_DETAIL, payload: res.data
        }))
    }
}

export function search_by_name (name){
    return async function (dispatch){
         await axios.get(`/videogames?name=${name}`)
        
        .then(res => dispatch({
            type:  SEARCH_BY_NAME, payload: res.data
        }))
    }
}

export function create_videogame(payload){
    return async function(dispatch){
        const res = axios.post('/videogames', payload)
        return res
    }
}

export function reset_detail(){
    return {
        type: RESET_DETAIL, payload:{}
    }
}