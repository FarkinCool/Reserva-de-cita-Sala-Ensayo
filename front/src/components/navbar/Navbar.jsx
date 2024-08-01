import logo from "../../assets/logo.jpg";
import avatar from "../../assets/avatar.png";
import styles from "./Navbar.module.css";
import { NavLink , useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useRef, useState , useEffect} from "react";
import { logoutUser, setUserData } from "../../redux/reducer";

export default function Navbar() {
    const {pathname} = useLocation();
    const user = useSelector((state) => state.actualUser.user); ///
  
    // console.log("loggin");
     console.log(user);
    // console.log(user.user.name);

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        const confirm = window.confirm("Estas seguro de cerrar cesion :P ")
        if(confirm){
            dispatch(setUserData({ loggin: false, user: {id: null }}));
            navigate("/");  // Redirige al usuario a la página de login después de cerrar sesión
        }    
    };

    const handleToggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleSubmit = () =>{
            navigate("/login");
    };


    return(
        <div className={styles.navbarContainer}>
            <div className={styles.logoSection}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.linkSection}>
                <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : null)}><span>Home</span></NavLink>
                
                {user && ( 
                    <NavLink to="/registerappointment" className={({ isActive }) => (isActive ? styles.active : null)}><span>Reservar</span></NavLink>
                )}
                {user && ( 
                    <NavLink to="/appointments" className={({ isActive }) => (isActive ? styles.active : null)}><span>Mis Reservaciones</span></NavLink>
                )}

                <NavLink to="about" className={({ isActive }) => (isActive ? styles.active : null)}><span>About</span></NavLink>
            </div>
            <div className={styles.userSection}>
                {user ?  (
                    <div className={styles.dropdown} ref={dropdownRef}>
                    <div className={styles.avatarSection} onClick={handleToggleDropdown}>
                        <div><span>{user.user.name}</span></div>
                        <img src={avatar} alt="avatar" />
                    </div>
                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
                        </div>
                    )}
                    </div>
                        
                ) : (
                <div className={styles.userWithout} >
                    <div>
                        <span className={styles.inicioSesion} onClick={handleSubmit}>Iniciar Sesion</span>
                    </div>
                    <div className={styles.avatarSection}>
                        <img src={avatar} alt="avatar" />
                    </div>
                </div>

                )}
            </div>
        </div>
    )
}