import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import s from './styles/detail.module.css'
import {get_videgames_detail , reset_detail} from '../redux/actions'
import Loader from './Loader'

function Detail() {
   
   let {id} = useParams()
    const dispatch = useDispatch()
    const details = useSelector(state => state.gamesDetail)
    useEffect(() => {
    dispatch(get_videgames_detail(id)) 
    return () => dispatch(reset_detail())   
    }, [dispatch , id])
    //const genresmap = details?.map(c => c.genres)
   console.log(details)
    return (
        <div >
            <Link className={s.btn} to={'/Home'}>BACK</Link>
            {   !details.name ? 
                    <Loader/> :              
                <div className={s.container}> 
                    <div className={s.sectionName}>
                      <h1>{details.name}</h1>
                      <img src={details.img || details.background_image} alt={details.name} />
                      <p className={s.description}>Description :{details.description && details.description.replace(/<[^>]+>/g, '')}</p>
                    </div>
                    <span className={s.holder}></span>
                    <div className={s.sectionInfo}>
                      <h2><p>Released: </p> <br/>{details.released}</h2>
                      <h3><p>Rating:</p> <br/>{details.rating}</h3>
                      <h5><p>Genres:</p> <br/>{details.genres?.map(c => c.name).join(' | ')}</h5>
                      <div className={s.plataforms}>
                      <h4><p>Plataforms:</p> <br/>{typeof details.platforms === 'string' ? details.platforms : details.platforms?.join(' | ')}</h4>
                     </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Detail
