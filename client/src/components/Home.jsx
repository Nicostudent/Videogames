import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  filter_created,
  get_all_videogames,
  order_name,
  get_by_genre,
  filter_genre,
  order_rating,
} from "../redux/actions";
import Card from "./Card";
import Paginado from "./Paginado";
import s from "./styles/home.module.css";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import SearchBar from "./SearchBar";

function Home() {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogames);
  const genrefromDb = useSelector((state) => state.genresdb);
  const loaderState = useSelector((state) => state.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [ordenated, setOrdenated] = useState("");
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogame = videogame.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
   );

  const handlePaginado = Math.ceil(videogame/videogamesPerPage) 
if(currentPage !== 1 && currentPage > handlePaginado) {
  setCurrentPage(handlePaginado)
}

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    dispatch(get_all_videogames());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(get_all_videogames())
    dispatch(get_by_genre());
  }, []);

  function handleFilterCreated(e) {
    e.preventDefault(e);
    setCurrentPage(1);
    dispatch(filter_created(e.target.value));
    setOrdenated(`ORDENATED ${e.target.value}`);
  }
  
  function handleOrdenated(e) {
    e.preventDefault(e);
    setCurrentPage(1);
    dispatch(order_name(e.target.value));
    setOrdenated(`NAME ${e.target.value}`);
  }
  function handleRating(e) {
    e.preventDefault(e);
    setCurrentPage(1);
    dispatch(order_rating(e.target.value));
    setOrdenated(`RATING ${e.target.value}`);
  }
  function handleFilterByGenre(e) {
    e.preventDefault(e);
    setCurrentPage(1);
    dispatch(filter_genre(e.target.value));
    setOrdenated(`GENRE ${e.target.value}`);    
  }
  // const handleOrdenatedgenre = currentVideogame.map(c => c.genres.includes(ordenated)).length === 0 
  // ? <h1>"no hay videojuegos con ese genero"</h1> 
  // : console.log(" toma tu genero")
 // console.log(handleOrdenatedgenre)
 const a = ordenated.includes("Genre") && currentVideogame.length ? console.log('true') : console.log('false')
 

  console.log(a)
  console.log(ordenated)
//  console.log(currentVideogame)
//  console.log(setOrdenated('Genre'))

  return (
    <div className={s.containerPage}>
      <div className={s.searchBar}>     
       
        <SearchBar />
        <select onChange={(e) => handleOrdenated(e)}>
          <option hidden>Order</option>
          <option value="asc">A~Z</option>
          <option value="des">Z~A</option>
        </select>
        <select onChange={(e) => handleRating(e)}>
          <option hidden>Rating</option>
          <option value="mostPopular">Most Popular</option>
          <option value="lessPopular">Least Popular</option>
        </select>
        <Link className={s.link} to={"/create"}>
          Create!
        </Link>
        <select onChange={(e) => handleFilterByGenre(e) }>
         
          <option hidden>Genres</option>
          <option value="all">All</option>          
          {genrefromDb.length && genrefromDb?.map((c) => {
            return (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all">ALL</option>
          <option value="created">CREATED</option>         
          <option value="api">API</option>
        </select>
        <button className={s.refresh} onClick={() => window.location.reload()}>Refresh</button>
        <Link className={s.landing} to={'/'}>back to landing</Link>
      </div>

      <Paginado
        videogamesPerPage={videogamesPerPage}
        videogame={videogame.length}
        paginado={paginado}
      />
      <div className={s.gridContainer}>
        <div className={s.grid}>
          { ordenated.includes("GENRE") && !currentVideogame.length ?
           <h1 className={s.notFound}>'Sry, Genre not found'</h1> :
           ordenated.includes("ORDENATED") && !currentVideogame.length ?
            <h1 className={s.notFound}>'Need to <Link to={"/create"}>create</Link> a game first' </h1> :
          !currentVideogame.length ? (
            <Loader />
          ) : (          
            typeof currentVideogame == 'string' ? 
            <h1 className={s.notFound}>"Name not found"</h1> : 
                               
            currentVideogame?.map((c) => (                              
              <Link key={c.id} to={`/videogames/${c.id}`}>
                <Card
                  key={c.id}
                  img={c.img || c.background_image}
                  name={c.name}
                  genre={c.genres}
                  rating={c.rating}
                  />
              </Link>          
             ))
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Home;
