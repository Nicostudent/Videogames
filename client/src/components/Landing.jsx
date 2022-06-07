import { Link } from "react-router-dom";
import s from "./styles/landing.module.css";
// import iconoLanding from '../assets/iconoLanding.jpeg'
import joystick from '../assets/joystick1.svg'

function Landing() {
  return (
    <div className={s.container}>      
      <div className={s.content}>
        <img  className={s.img} src={joystick} alt="joystick" />
        <h1 className={s.title}>Welcome</h1>
        <Link className={s.link} to={"/Home"}>
          START
        </Link>
        <p><span className={s.triangle}></span> Player 1 </p>
        <p><span className={s.player2}></span> Player 2 </p>
        
      </div>
    </div>
  );
}

export default Landing;
