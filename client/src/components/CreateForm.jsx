import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  create_videogame, get_by_genre, get_all_videogames } from '../redux/actions';
import s from './styles/createForm.module.css'

function validate(input){
    let errors = {}
    if(!input.name || input.name.length > 100 ){
        errors.name = 'Name required'
    }else if( !input.description){
        errors.description = "Description required"
    }else if( !input.released){
        errors.released = "Date released required "    
    }else if( !input.genres){
        errors.genres = "Need some genres"    
    }else if( !input.platforms){
        errors.platforms = "Add at least one Platforms pls"
    }
    return errors;
}



export default function VideogameCreate() {
    
    const history = useHistory();
   const dispatch = useDispatch();
   const genreState = useSelector((state) => state.genresdb);
   const vPlataforms = useSelector((state) => state.AllVideoGames);
   const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    background_image: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  //console.log(genreState.map(c => c.name))
  function handleChange (e){    
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
    }))
    console.log(input)
}
function handleSelect(e){
    e.preventDefault()
    setInput({
        ...input,
        genres: [...input.genres, e.target.value]
        })
    }
    function handleSelectPlataforms(e){
        e.preventDefault()
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(create_videogame(input))
        alert('created')
        setInput({
            name: "",
            description: "",
            background_image: "",
            released: "",
            rating: "",
            genres: [],
            platforms: "",
        })
        history.push('/Home')
    }
    useEffect(() => {
        dispatch(get_by_genre());
    }, []);
    useEffect(() => {
        dispatch(get_all_videogames());
    }, []);
    

const allPlatforms = vPlataforms.map((e)=> e.platforms);
const platforms = [...new Set(allPlatforms.flat())].sort();
console.log(platforms)
return (
    <div className={s.container} >     
     <Link className={s.btn} to={'/Home'}> BACK </Link>
     <h1 className={s.title}>Create</h1>
     <form className={s.form} onSubmit={(e) => handleSubmit(e)} action="">
        <div className={s.formSection}>         
                <div>
                    <label>Name : <br/></label>
                    <input
                    type="text" 
                    value={input.name}
                    name= "name"
                    maxLength={100}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                    {errors.name && (
                        <p className={s.error}> {errors.name}</p>
                    )}
                </div>
                <div  > 
                    <label>Description :<br/></label>
                    {/* <input 

                    maxLength={250}
                    value={input.description}
                    name = 'description'
                    onChange={(e) => handleChange(e)}
                    className={s.inputDescription}
                    required
                    /> */}
                    <textarea className={s.DescriptionArea}
                     value={input.description}
                     required onChange={(e) => handleChange(e)}
                     name="description" 
                     cols="70"
                     rows="10">"Description..."</textarea>
                    {errors.description && (
                        <p className={s.error}> {errors.description}</p>
                    )}
                </div>
                <div  className={s.each}>
                    <label>released:<br/></label>
                    <input 
                    type="date"
                    value={input.released}
                    name = 'released'
                    onChange={(e) => handleChange(e)}
                    required
                    />
                    {errors.released && (
                        <p className={s.error}> {errors.released}</p>
                    )}
                </div>
                <div  className={s.each}>
                    <label>rating:<br/></label>
                    <input 
                    type="number"
                    value={input.rating}
                    min="1" 
                    max="5"
                    name = 'rating'
                    onChange={(e) => handleChange(e)}
                    required
                    />
                    {errors.rating && (
                        <p className={s.error}> {errors.rating}</p>
                    )}
                </div>
                <div  className={s.imgInput}>
                    <label>image:<br/></label>
                    <input 
                
                    type="text"
                    value={input.background_image}
                    name = 'background_image'
                    onChange={(e) => handleChange(e)}
                    />
                </div>      
                <br/>   
                <select onChange={(e) => handleSelectPlataforms(e)} >
                <option  hidden>platforms</option>
                {platforms?.map((c) => {         
                return (
                    <option key={c} value={c}>{c}</option>
                        );
                })}        
                {errors.platforms && (
                        <p className={s.error}> {errors.platforms}</p>
                    )}
            </select>           
                <select onChange={(e) => handleSelect(e)} >
                <option  hidden>Genres</option>
                {genreState?.map((c) => {         
                return (
                    <option key={c.id} value={c.name}>{c.name}</option>
                        );
                })}
                
            </select>
                {errors.Genres && (
                    <p className={s.error}> {errors.Genres}</p>
                    )}
                {console.log(input.genres.map(c => c + " ,"))}
       </div>
      <span className={s.holder}></span>
       <div className={s.creatin}>  
                 <img className={s.image} src={input.background_image} alt='No img found'/>
                 <ul><li>genres :{input.genres.map(c => c + " ,")}</li></ul>
                <ul><li>platforms :{input.platforms.map(c => c + " ,")}</li></ul>    
          {
            input.name.length && input.description.length && input.platforms.length && input.genres.length ? 
            <button className={s.btnCreate} type="submit">Create GAME</button> : 
            <p className={s.error}> "Need to compleat the form in order to create" </p>  
           }     
       </div>
      
     </form>
        
    </div>
  );
}