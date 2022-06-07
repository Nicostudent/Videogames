import React from "react";
//import mainBackGround from '../assets/mainBackGround.webp'
import s from "./styles/loader.module.css";
function Loader() {
  return (
    <div className={s.loadingContainer}>
      <p className={s.item1 }>L</p>
      <p className={s.item2 }>o</p>
      <p className={s.item3 }>a</p>
      <p className={s.item4 }>d</p>
      <p className={s.item5}>i</p>
      <p className={s.item6 }>n</p>
      <p className={s.item7}>g</p>
    </div>
  );
}

export default Loader;
