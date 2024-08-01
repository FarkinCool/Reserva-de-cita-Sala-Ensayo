//import styles from "./Reservation.module.css";
import styles from "./Userdetail.module.css"
import image1 from "../../../public/default.jpg"
import { useEffect, useState, useRef } from "react";

const imgUrl = "http://localhost:3000/src/public/img";
export default function Userdetail({id, name, email, image}){
    // const useRef1= useRef();
    // const avatar = useRef1.current.src = `http://localhost:3000/img/${image}`;
    // const handleClick = () => {
    //     if(window.confirm("Deseas cancelar la reservacion??") ){
    //         handleAppointmentCancel(id)  
    //     } 
    // };
    const imageUrl = image ? `${imgUrl}/${image}` : image1;

    return(
        <>
            <div className={styles.containerDetail} > 
                <div> Id de Usuario: {id}</div>
                <div> Nombres : {name} </div> 
                <div> Email: {email} </div>
                <div> <img className={styles.imgAvatar} src={imageUrl} alt="" /> </div>
                {/* <div><img src={avatar } alt="avaar" /></div> */}
            </div> 
        </>
        
    )
}
