import styles from "./Card.module.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Card({title,text, image}){
    const navigate = useNavigate();

    let isLoggedIn = useSelector((state) => state.actualUser.userData.loggin);
    console.log(isLoggedIn);
    const handleSubmit = () =>{
        
        if (isLoggedIn) {
            navigate("/registerappointment");
        } else {
            navigate("/login");
        }
    };

    useEffect(() => { 
        if (!isLoggedIn) {
            console.log(`revisar actual ${isLoggedIn}`);
            navigate("/home");
            
        }
    },[isLoggedIn, navigate])

    return(
        <div className={styles.cardContainer}>
            <div className={styles.imageCard}>
                <img src={image} alt="sala1" />
            </div>
            <div className={styles.dataCard}>
                <h1>{title}</h1>
                <h2>$50.00 la hora</h2> <span onClick={handleSubmit}>Reservar</span>                
                <p>{text}</p>
            </div>
        </div>
    )
}