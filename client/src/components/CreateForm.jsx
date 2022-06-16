import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  create_videogame, get_by_genre, get_all_videogames } from '../redux/actions';
import s from './styles/createForm.module.css'

function validate(input){
    let errors = {}
    let urlValid = /^(http(s):)([/|.|\w|\S|-])*\.(?:jpg|gif|png)/;
    if(!input.name || input.name.length > 100 ){
        errors.name = 'Name required, allow strings and numbers'
    }else if( !input.description || input.description.length > 250){
        errors.description = "Description required cannot be longer than 250 characters"
    }else if( !input.released){
        errors.released = "Date released required "    
    }else if( !input.genres){
        errors.genres = "Need some genres"    
    }else if( !input.platforms){
        errors.platforms = "Add at least one Platforms pls"
    }else if(!input.background_image || urlValid.test(input.background_image) === false ){
        errors.background_image = "Pls add an valid extension (jpg, gif, png)"
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
    if(!input.genres.includes(e.target.value)){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        }
        clearSelectedgenre();
    }
    function handleSelectPlataforms(e){
        e.preventDefault()
        if(!input.platforms.includes(e.target.value)){           
        setInput({
            ...input,        
                platforms: [...input.platforms, e.target.value]                      
        })      
     }   
     clearSelected();     
    }
    function clearSelected(){
        let e =  document.getElementById('name').selectedOptions;
    
        for(let i = 0; i < e.length; i++){
          e[i].selected = false;
        }
      }
      function clearSelectedgenre(){
        let e =  document.getElementById('genre').selectedOptions;
    
        for(let i = 0; i < e.length; i++){
          e[i].selected = false;
        }
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
    
    function refresh(e){
        e.preventDefault()
        setInput({
            name: "",
            description: "",
            background_image: "",
            released: "",
            rating: "",
            genres: [],
            platforms: "",
        })
    }
    function handleDelete(c){
       setInput({
        ...input,
           genres: input.genres.filter(f => f !== c)
       })
    }

const allPlatforms = vPlataforms.map((e)=> e.platforms);
const platforms = [...new Set(allPlatforms.flat())].sort();
if(platforms.length > 19){
    platforms.pop()
}
console.log(input)
return (
    <div className={s.container} >     
     <Link className={s.btn} to={'/Home'}> BACK </Link>
     <h1 className={s.title}>Create</h1>
      <button className={s.btnrefresh} onClick={(e) => refresh(e)} >REFRESH</button> 
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
                    step="1"
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
                    {errors.background_image && (
                        <p className={s.error}> {errors.background_image}</p>
                    )}
                </div>      
                <br/>   
                <select id='name' onChange={(e) => handleSelectPlataforms(e)} >
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
                <select id='genre' onChange={(e) => handleSelect(e)} >
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
       {
            input.background_image ?
            <img className={s.image} src={input.background_image} alt='No img found'/> :
            <></>
       } 
       {
            input.genres.length ? 
            <ul><li>genres :{input.genres.map(c =>{
                return  <div>
                     <label>{ c + " ,"}</label>
                    <button type='button' onClick={() => handleDelete(c)} >x</button>
                 </div>                            
                     })}</li></ul> :
                     <></>
                    }
                    {
                        input.platforms.length ?
                     <ul><li>platforms :{input.platforms && input.platforms.map(c => c + " ,")}</li></ul>    :
                     <></>
                    }
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
