
import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./registerAppointment.module.css";
import { useNavigate } from "react-router-dom";
import  { useSelector } from "react-redux";
import Userdetail from "../../components/userDetail/Userdetail";

// import { date } from "yup";


const registerUrl = "http://localhost:3000/appointments/schedule"; 

function RegisterAppointment( props){
    const navigate = useNavigate();
    const userId = useSelector((state) => state.actualUser?.user.user.id);
    console.log("appotiIDDDDDD");
    console.log(userId);

    const actualUser= useSelector((state) => state.actualUser?.user.user);

    const initialState = {
        description: "",
        date: "",
        hours: "09",
        minutes: "00",
    };

    useEffect(() => {
        if(!userId){
            navigate("/");
        }
    }, [userId, navigate]);

    const [reserva, setReserva] = useState(initialState);  /// appointmnt  setappotinment
    const [errors, setErrors] = useState({
        date: "Debe ingresar una fecha",
    });
     
    const validateReserva = ({
        description,
        date,
        hours,
        minutes,
    }) => { 
        const errors = {};
        if(!description) errors.description = "ingrese la descripcion";
            else if(description.length < 5) 
                errors.description= "la descripcion dbe ser almenos de 5 caracteres"
        if(!date) errors.date = "ingrese la fecha";
            else if(isWeekend(date))
                errors.date = "la fecha selecionada es un fin de semana";
        // if(!time) errors.time = "ingrese la hora de reserva";
        return errors;
    };

    const isWeekend = (date) =>{
        const day = new Date(date).getDay();
        return day === 5 || day === 6;
    };


    const handleChange = (event) => {
        const {name, value} = event.target;
        const updateAppointment = {
            ...reserva,
            [name]: value,
        };
        setReserva(updateAppointment);
        setErrors(validateReserva(updateAppointment));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const reservaData = {    //newappointmente
            description: reserva.description,
            date: reserva.date,
            time: `${reserva.hours}:${reserva.minutes}`,
            userId
        };
        console.log(reservaData);
        axios
            .post(registerUrl, reservaData)
            .then(({data}) => {
           // console.log(data);
                alert("la reserva fue creada satisfactoriamente");
                setReserva(initialState);
                navigate("/appointments");
        })
        .catch((error) => {
            alert(error.response.data);
        });
    };

    const validhours = ["09","10","11","12","13","14","15","16","17","18","19"];
    const validMinutes = ["00","30"];
   
    function getTomorrow(){
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);
        return tomorrow.toISOString().split("T")[0]; 
    }

    function getFourteenDays(){
        const today = new Date();
        const fourteenDays = new Date(today);
        fourteenDays.setDate(fourteenDays.getDate()+14);
        return fourteenDays.toISOString().split("T")[0];
    }

    return (
        <>
        <div className={styles.container}>
            <h2>Reserva tu Sala</h2>
            
            <form onSubmit={handleSubmit} className={styles.formAppointment} >

            <div  className={styles.formGroup}>
                <label htmlFor="date"> Fecha: </label>
                <input 
                    type="date"
                    id="date"
                    name="date"
                    min={getTomorrow()}
                    max={getFourteenDays()}
                    value={reserva.date}
                    onChange={handleChange}
                />
                {errors.date && <span style={{color:"red"}} >{errors.date} </span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="date"> Horario: </label>
                <select 
                    id="hours"
                    name="hours"
                    value={reserva.hours}
                    onChange={handleChange}
                >
                {validhours.map((hour) => (
                    <option key={hour} value={hour}> {hour}</option>
                ))}
                </select>
                <select 
                    id="minutes"
                    name="minutes"
                    value={reserva.minutes}
                    onChange={handleChange}
                >
                {validMinutes.map((minute) => (
                    <option key={minute} value={minute}> {minute}</option>
                ))}
                </select>

                {errors.date && <span style={{color:"red"}} >{errors.date} </span>}
            </div>

            <div  className={styles.formGroup}>
                <label htmlFor="descripcion"> Descripcion: </label>
                <input 
                    type="text"
                    id="description"
                    name="description"
                    value={reserva.description}
                    placeholder="Ingresar una descripcion"
                    onChange={handleChange}
                />
                {errors.description && <span style={{color:"red"}} >{errors.description} </span>}
            </div>

                <button type="submit" disabled={Object.keys(errors).length > 0  }  >Reservar Sala</button>

            </form>
            <div>
                <Userdetail id={actualUser.id} name={actualUser.name} email={actualUser.email} image={actualUser.image} />
            </div>  
        </div>
        
              

        </>
    )
}

export default RegisterAppointment;


