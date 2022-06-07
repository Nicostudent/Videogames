import React from 'react'
import s from './styles/paginado.module.css'
function Paginado({videogamesPerPage, videogame, paginado}) {
    const pageNumbers = [];
    
        for (let i = 1; i <= Math.ceil(videogame/videogamesPerPage) ; i++) {
            pageNumbers.push(i)            
        }

    return (
        <nav className={s.container}>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(num => (
                      <li key={num}>
                        <a  onClick={()=> paginado(num)}>{num}</a>
                      </li>
                     ))
                }
            </ul>
        </nav>
    )
}

export default Paginado
