import Home from './views/home/home'
import Navbar from './components/navbar/Navbar'
import MyAppointments from './views/appointments/MyAppointments'
import Login from './views/login/login'
import Register from './views/register/register'
import { Routes, Route } from 'react-router-dom'
import RegisterAppointment from './views/registerAppointment/registerAppointment'
import ErrorPage from './views/errorPage/ErrorPage'
import About from './views/about/about'

function App() {
  const user = true;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path ="/" element={<Home />}/> 
        <Route path ="/home" element={<Home />}/> 
        <Route path ="/login" element={<Login/>} /> 
        <Route path ="/registeruser" element={<Register/>} />
        <Route path ="/registerappointment" element={<RegisterAppointment/>}/> 
        <Route path ="/appointments" element={<MyAppointments/>} />
        <Route path="/about" element={<About/>}/>

        <Route path='/*' element={<ErrorPage />}/>

      {/* <Home /> */}
      {/* <MyAppointments/> */}
      {/* <Login /> */}
        {/* <Register /> */}
      </Routes>
    </>
  )
}

export default App
