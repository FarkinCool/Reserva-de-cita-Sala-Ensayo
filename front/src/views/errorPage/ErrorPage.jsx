import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage (){
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5);
    useEffect(() => {
    const timeDown = setTimeout(() => {
        if(countDown === 1) navigate("/home");
        setCountDown(countDown => countDown - 1);
      }, 1000);
      return () => clearTimeout(timeDown);
    }, [countDown]);
  
    useEffect(() => () => {
      setCountDown(5);
    }, []);

    return (
        <div style={{ width:"800px", height:"auto", margin:"auto", display: "flex", flexDirection:"column", alignItems:"center" , color:"lavender" }} >
        <h1>404</h1>
        <hr style={{width:"800px"}} />
        <h2 style={{color:"red"}}>No hay nada en esta URL</h2>
        <h3> Reserva nuestras salas en {countDown} segundos</h3>
        <img style={{height:"400px", width: "400px"}}
          src="/errorPage.jpeg"
          alt="404 - Not Found"
        />
      </div>
    )
}

export default ErrorPage;