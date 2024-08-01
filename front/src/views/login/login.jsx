import { validate } from "../../helpers/validate";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from "./login.module.css";
import login from "../../assets/login.jpg";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducer";

const schema = Yup.object().shape({
    username: Yup.string().min(3).trim().required(),
    password: Yup.string().min(4).trim().required()
});

export default function Login(){
    const loginUrl = "http://localhost:3000/users/login";
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () =>{
        navigate("/registeruser");
    }

    const submitForm = (values) => {
        axios.post(loginUrl, values).
        then((res) => {            
            dispatch(setUserData(res.data));  //// camibio a ID
            console.log(res.data);

            alert("Muy bien!");  
            // values(useFormik(initialValues));
            navigate("/home");            
        }).        
        catch((error) => {alert("error credentials"); console.log((error)?.response?.res?.message);})   
    };

    const { handleSubmit, handleChange,values,errors,touched } = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      onSubmit: submitForm,
      validationSchema: schema,
    });

    useEffect(() => {
        if (values.username !=='' && values.password !== '') {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[values.username, values.password]);

    return(
        <div className={styles.containerWrap}>
        <div className={styles.containerLogin}>
            <div className={styles.imgContainer}>
                <img src={login} alt="avatar" />
            </div>
            <form onSubmit={handleSubmit} className={styles.loginForm} >
                <h2 className={styles}>LOGIN</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="">Username: </label>
                    <input type="text" 
                        name="username"
                        placeholder="ingrese su usuario"
                        onChange={handleChange}
                        value={values.username}
                    />
                </div >
                <div className={styles.formGroup}>
                    <label htmlFor="">Password: </label>
                    <input type="password" 
                        name="password"
                        placeholder="ingrese su contrasenia"
                        onChange={handleChange}
                        value={values.password}
                    />
                    <div onClick={handleClick} className={styles.registeruser}>Registrate ahora! |m| </div>
                </div>
                <button disabled={buttonDisabled} type="submit" >Iniciar sesion</button>
                <br />
                {errors.username && touched.username &&<span className={styles.error}>Escribir usuario</span>}
                <br />
                {errors.password && touched.password && <span className={styles.error}>Escribir contrasenia</span>}
            </form>    
        </div>
        </div>
    )   
}