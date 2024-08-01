import { useEffect, useState } from "react";
import misTurnos from "../../helpers/allAppointments";
import Reservation from "../../components/reservation/Reservation";
import styles from "../../components/reservation/Reservation.module.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAppoinments } from "../../redux/reducer";

//const appointmentUrl = "http://localhost:3000/appointments/";
const getUserById = "http://localhost:3000/users/";
const postCancel = "http://localhost:3000/appointments/cancel/";

export default function MyAppointments () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const actualUserId = useSelector((state) => state.actualUser.user.user.id);
   
    console.log(actualUserId);
    
    useEffect(() => {
        axios.get(getUserById+actualUserId).
        then(response => response.data).
        then(actualUser => { dispatch(setUserAppoinments(actualUser.appointments)); console.log(actualUser.appointments
        )})
        .catch(error => console.log(error.message));
    }, [actualUserId, dispatch]);

    const appointmentsActuales = useSelector((state) => state.actualUser.userAppointments);
    console.log("apooimntssss");
    console.log(appointmentsActuales);
    // const [appointment, setAppointment] = useState([]);
    

     const loggin = useSelector((state) => state.actualUser.user.loggin);
     useEffect(() => { 
         !loggin && navigate("/home")
     },[loggin])


    const handleAppointmentCancel = (appointmentId) => {
        axios.put(postCancel + appointmentId)
        .then(response => response.data)
        .then(data =>{
            axios.get(getUserById + actualUserId)
            .then(response => response.data.appointments)
            .then(appointments => dispatch(setUserAppoinments(appointments)))
            .catch(error => console.log(error.message))
        })

    }



    //post(appointment+"/1" | + "?name=homero" |, {nam: "homero", pass: "1234"})

    // useEffect(() => {  
    //     axios.get(appointmentUrl).
    //         then(res => res.data).
    //         then(appointmentDb => setAppointment(appointmentDb))   
    // },[])

    return(
        <div >
            <h1 className={styles.title}>Mis Reservaciones</h1>
            <div className={styles.container} style={{backgroundColor:"darkgray"}}>
                <span className={styles.spanTitle}>Item</span>
                <span className={styles.spanTitle}>Date</span>
                <span className={styles.spanTitle}>Time</span>
                <span className={styles.spanTitle}>Description</span>
                <span className={styles.spanTitle}>Status</span>
            </div>
            <div>
                {
                    appointmentsActuales.map((appointment, index) => {
                        return <Reservation key={index} 
                            index={index+1} id={appointment.id} date={appointment.date} time={appointment.time} description={appointment.description} status={appointment.status } handleAppointmentCancel={handleAppointmentCancel}
                        />;
                    })
                }
            </div>
        </div>
    )
};



