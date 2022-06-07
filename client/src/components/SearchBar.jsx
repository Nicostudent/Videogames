import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { search_by_name } from '../redux/actions'
import s from "./styles/searchBar.module.css";
import busqueda from '../assets/lupa.png'

function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleInputChange(e) {      
    e.preventDefault();
    setName(e.target.value)    
}

function handleOnSubmit (e)  {
    e.preventDefault();    
    setName("")
    dispatch(search_by_name(name))   
  }

  console.log(name)
  /*setear input a ''  */

    return (
        <div className={s.searchbar}>
            <input type="text" value={name} placeholder='Search by name...'
                onChange={(e) => handleInputChange(e) }
            /> 
          
             
            <button className={s.btnSearch}
            
                 type='submit'
                  onClick={(e) => handleOnSubmit(e)}>
                 <img className={s.imgSearch}  src={busqueda} alt='asd' />
              
           </button>          
        </div>
    )
}

export default SearchBar
