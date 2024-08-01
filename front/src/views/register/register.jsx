import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from "./register.module.css";
import { imgDefault } from '../../helpers/landInfo';
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import Compressor from 'compressorjs';
import { useNavigate } from "react-router-dom";

const initData = {
    imagen: "default.jpg",
    imagen64: imgDefault
  };
 

const schema = Yup.object().shape({
    name: Yup.string().min(3).trim().required(),
    email: Yup.string().email().required(),
    birthdate: Yup.string().required(),
    dDni: Yup.string().min(8).max(10).required(),
    username: Yup.string().min(3).trim().required(),
    password: Yup.string().min(4).trim().required(),
    cpassword: Yup.string().required()
        // .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        // .required('Debe confirmar la contraseña')
});

export default function Register(){
    const loginUrl = "http://localhost:3000/users/register";
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [datos, setDatos] = useState(initData);
    const imgRef = useRef();
    const navigate = useNavigate();
  
    const submitForm = (values ) => {
       // const {name, email, birthdate, dDni, username, password, cpassword} = values;
        // const {cpassword , ...valuesData} = values;
        if(values.password === values.cpassword){
            const combinedValues = { ...values, ...datos };
            axios.post(loginUrl, combinedValues).
            then(res => {alert("exito"); navigate("/login"); console.log(res.data)}).
            catch(error => {alert(error.message); console.log(error);})              
        }
        else{
            alert("las contrasenias son diferentes");
        }
        
    };

    const { handleSubmit, handleChange,values,errors,touched } = useFormik({
      initialValues: {
        name :'',
        email: '',
        birthdate: '',
        dDni : '',
        username: '',
        password : '',
        cpassword: ''
      },
      onSubmit: submitForm,
      validationSchema: schema,
    });

    const convertBase64 = (file, cb) => {
        let reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = function () {
          cb(reader.result);
        }
        reader.onerror = function(error){
          console.log('Error convertBase64: ', error);
        }
      }

      const handleFileChange = (e)=>{
        let file = e.target.files[0];
        const maxSize = 127357; // 2MB limit
        console.log(file.size);
        if (file.size > maxSize) {
            alert("El tamaño del archivo es muy grande");
            return;
        }

        if (file) {
            new Compressor(file,{
                quality:0.3,
                success(fresult){
                    convertBase64(fresult, (result)=>{
                      console.log('result => ', result);
                      imgRef.current.src = result;
                      let data64 = result.split(',')[1];
                      console.log('data64: ',data64);
                      const nDatos = {
                        ...datos,
                        imagen: file.name,
                        imagen64: data64
                      };
                      setDatos(nDatos);
                    });
                },
                error(err){
                    throw new Error("archivo muy grande", err);
                }
            }); 
        }
      }

    useEffect(() => {
        if (values.name !=='' && values.email !== '' &&
            values.birthdate !=='' && values.dDni !=='' && 
            values.username !=='' && values.password !=='' &&
            values.cpassword !=='' )
             {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[values.name, values.email, values.birthdate, values.dDni, values.username, values.password, values.cpassword ]);

    return(
        <div className={styles.container}>
                    
            <form onSubmit={handleSubmit} className={styles.loginForm} >
                <h2 className={styles}>REGISTRO DE USUARIO</h2>
                    <div className={styles.containerUser}>    
                        <div>
                            <div className={styles.formGroup}>
                                <label htmlFor=""className={errors.name && touched.name ? styles.errorLabel : ''}>Name: </label>
                                <input type="text" 
                                    name="name"
                                    placeholder="Nombres completos"
                                    onChange={handleChange}
                                    value={values.name}
                                    className={errors.name && touched.name ? styles.errorInput : ''}
                                />
                            </div >
                            <div className={styles.formGroup}>
                                <label htmlFor="" className={errors.email && touched.email ? styles.errorLabel : ''}>Email: </label>
                                <input type="email" 
                                    name="email"
                                    placeholder="Ingrese su correo"
                                    onChange={handleChange}
                                    value={values.email}
                                    className={errors.email && touched.email ? styles.errorInput : ''}
                                />
                            </div >

                            <div className={styles.formGroup}>
                                <label htmlFor=""className={errors.birthdate && touched.birthdate ? styles.errorLabel : ''}>Birhdate: </label>
                                <input type="date" 
                                    name="birthdate"
                                    placeholder="Fecha de nacimiento"
                                    onChange={handleChange}
                                    value={values.birthdate}
                                    className={errors.birthdate && touched.birthdate ? styles.errorInput : ''}
                                />
                            </div >
                            <div className={styles.formGroup}>
                                <label htmlFor=""className={errors.dDni && touched.dDni ? styles.errorLabel : ''} >Passport: </label>
                                <input type="text" 
                                    name="dDni"
                                    placeholder="Ingrese su DNI"
                                    onChange={handleChange}
                                    value={values.dDni}
                                    className={errors.dDni && touched.dDni ? styles.errorInput : ''}
                                />
                            </div >                        
                        </div>
                        <div className={styles.containerAvatar}>
                            <img src="default.jpg" ref={imgRef} alt="avatar"  />
                            <input onChange={handleFileChange} type="file" />
                        </div>
                    </div>
                <div className={styles.containerCredential}>
                    <div className={styles.formGroup}>
                        <label htmlFor="" className={errors.username && touched.username ? styles.errorLabel : ''}>Username: </label>
                        <input type="text" 
                            name="username"
                            placeholder="Ingrese su usuario"
                            onChange={handleChange}
                            value={values.username}
                            className={errors.username && touched.username ? styles.errorInput : ''}
                        />
                    </div >
                    <div className={styles.formGroup}>
                        <label htmlFor="" className={errors.password && touched.password ? styles.errorLabel : ''}>Password: </label>
                        <input type="password"
                             
                            name="password"
                            placeholder="Ingrese su contrasenia"
                            onChange={handleChange}
                            value={values.password}
                            className={errors.password && touched.password ? styles.errorInput : ''}
                        />
                        <label htmlFor="" className={errors.cpassword && touched.cpassword ? styles.errorLabel : ''} >Confirm Password: </label>
                        <input type="password" 
                            name="cpassword"
                            placeholder="Confirme su contrasenia"
                            onChange={handleChange}
                            value={values.cpassword}
                            className={errors.cpassword && touched.cpassword ? styles.errorInput : ''}
                        />
                        
                    </div>
                </div>
                <button disabled={buttonDisabled} type='submit' >Registrar</button>
            </form>    
        </div>
    )   
}