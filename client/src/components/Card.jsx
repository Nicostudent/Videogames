import React from 'react'
import s from './styles/card.module.css'
// import imgDefault from '../assets/imgDefault.jpg'
function Card({name, img  , genre, rating}) {

    
    return (        
        <div className={s.container }>
                <div className={s.padre} >
                <div className={s.mask} >
                     <img className={s.image} src={img} alt={name}/>
                </div>
                </div>
                <div className={s.text}>
            <h3 className={s.name} >{name}</h3>
            <h2 className={s.genres}>{ typeof genre[0] === 'object' ? genre.map(c => c.name).join(' | ') : genre.join(' | ') }</h2>
            <h4 className={s.rating}>Rating : {rating}</h4>
                    
                </div>
        </div>
    )
}
export default Card
