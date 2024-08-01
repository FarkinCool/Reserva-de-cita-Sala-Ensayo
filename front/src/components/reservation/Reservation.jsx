import styles from "./Reservation.module.css";

export default function Reservation({index, id, date, time, description, status, handleAppointmentCancel}){

    const handleClick = () => {
        if(window.confirm("Deseas cancelar la reservacion??") ){
            handleAppointmentCancel(id)  
        } 
    };
    return(
        <>
            <p className={styles.container} > 
                <span> {index} </span>
                <span> {date} </span> 
                <span> {time} </span>
                <span> {description} </span>
                {status === 'active' ? (
                    <span className={styles.active} onClick={handleClick}> Activo </span> 
                    ) : ( <span className={styles.cancelado}> Cancelado </span> )
                }
            </p> 
        </>
        
    )
}
