import app from "./server";
import { PORT, DB_PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
//import dotenv from "dotenv";



AppDataSource.initialize()
    .then(res =>{
        console.log(`Conexion to DATABASE was sucessfull in port ${DB_PORT}`);
        app.listen(PORT,() =>{
            console.log(`Server listening on http://localhost:${PORT}`);
        })
});


















/*

// const nombre = "bartolomiau";

// const saludar = (name: string): string =>{
//     return `hola ${name}`;
// }
// console.log(saludar(nombre));
// saludar("juan");

// const calcularTotal = (quantify: number, price: number): number => {
//     return quantify * price;
// }

// calcularTotal(5,10);

// interface IAddress{
//     street: string,
//     city: string
// }

// interface IUser{
//     name: string,
//     age: number,
//     email: string,
//     active: boolean,
//     address: IAddress
// }

// const usuario: IUser = {
//     name: "bartolomiau",
//     age: 22,
//     email: "bmichi@mail.com",
//     active: true,
//     address:{
//         street: "calle falsa",
//         city: "disneylandia"
//     }
// }


// enum UserRole {
//     ADMIN="admin",
//     USER = "user",
//     GUEST = "guest"
// }

// type TUser = {
//     name: string,
//     age: number,
//     email: string,
//     active: boolean,
//     address: IAddress
//     role: UserRole //admin, user, guest
// }

// const user1: TUser = {
//     name: "bartolomiau",
//     age: 25,
//     email:"bartomiau@mail.com",
//     active: true,
//     address:{
//         street: "ciudad blanca",
//         city: "choliwood"
//     },
//     role: UserRole.ADMIN
// }
// ////////////////////////////// 
// interface ITrack{
//     title: string
// }

// interface ISong extends ITrack{
//     artist: string,
//     duration: number;
// }

// interface IPodcast extends ITrack{
//     host: string,
//     episodes: number
// }

// interface IAudioBook extends ITrack{
//     author: string,
//     duration: number
// }

// interface IPlaylist{
//     name: string,
//     playlist: ((ISong | IPodcast | IAudioBook)[]) | ITrack[] //para agregar varios tipos en un arreglo
// }

// const song1: ISong={
//     title: "By the way",
//     artist: "Red hoy chilepepers",
//     duration: 100
// }

// const podcast1: IPodcast ={
//     title: "Cuentos de la cripta",
//     host: "una Calavera",
//     episodes: 100 
// }

// const audiobook1: IAudioBook = {
//     title: "el gato volador",
//     author: "bartolomiau dj",
//     duration: 99
// }


// const myPlayslist: IPlaylist= {
//     name: "my playlist",
//     playlist: [song1, podcast1, audiobook1]
// }

// const myPlaylist2:IPlaylist = {
//     name: "My playlist2",
//     playlist: [song1, podcast1, audiobook1]
// }


// /////////////////////////////////////////////////////

// //* EJERCICIO 1 ----- ----- ----- -----
// // Tipar la siguiente función:
// const calculaArea = (lado1: number, lado2: number): number  => lado1 * lado2;

// console.log(calculaArea(5, 6));

// //* EJERCICIO 2 ----- ----- ----- -----
// // Crear la función "presentarUsuario" para que retorne lo esperado:
// const presentarUsuario = (name: string, lastname? : string, age?: string): void => {
//   // Aquí tu código
//     console.log(`Nombre: ${name}, ${lastname ? "Apellido:" + lastname + "," : "" }   Edad: ${age || "No especifica"}`);
    
// };

// presentarUsuario("Homero");
// // 'Nombre: Homero, Edad: No especificada'
// presentarUsuario("Marge", "Bubbie");
// // 'Nombre: Marge, Apellido: Bubbie, Edad: No especificada'
// presentarUsuario("Lisa", "Simpson", "8");
// // 'Nombre: Lisa, Apellido: Simpson, Edad: 8'

// //* EJERCICIO 3 ----- ----- ----- -----
// // Generar el Tipo Personalizado "TPersona":
// // Extenderlo para "TEmpleado":
// // Aquí tu código:

// interface TPersona  {
//     nombre: string,
//     edad: number
// }

// interface TEmpleado extends TPersona  {
//     puesto: string,
//     empleadoDelMes: boolean
// }

// const persona: TPersona = {
//   nombre: "Marge",
//   edad: 35,
// };
// console.log(persona);

// const empleado: TEmpleado = {
//   nombre: "Homero",
//   edad: 37,
//   puesto: "Jefe de Seguridad",
//   empleadoDelMes: true,
// };
// console.log(empleado);

// //* EJERCICIO 4 ----- ----- ----- -----
// // Generar la interfaz "IProducto" y extenderla para "IProductoElectronico" e "IProductoRopa":
// // Aquí tu código:

// interface IProducto {
//     nombre: string,
//     precio: number
// }

// interface IProductoElectronico extends IProducto{
//     marca : string,
//     modelo: string
// }

// interface IProductoRopa extends IProducto{
//     talla: string,
//     color: string
// }

// const celularCODIGO: IProductoElectronico = {
//   nombre: "Smartphone",
//   precio: 500,
//   marca: "Samsung",
//   modelo: "Galaxy S20",
// };

// const remeraCODIGO: IProductoRopa = {
//   nombre: "Camiseta",
//   precio: 20,
//   talla: "M",
//   color: "Azul",
// };

// console.log(celularCODIGO);
// console.log(remeraCODIGO);

// //* EJERCICIO 5 ----- ----- ----- -----
// // Crear la Interfaz "ITarea" y a partir de ella la "ITareaParaEntregar":
// // Aquí tu código:

// interface ITarea {
//     titulo: string,
//     descripcion: string,
//     completada: boolean
// }

// interface ITareaParaEntregar extends Omit<ITarea, 'descripcion'>{
//     fechaLimite: string
// }

// const tarea: ITarea = {
//   titulo: "TypeScript II",
//   descripcion: "Configuración y práctica",
//   completada: false,
// };

// const tareaParaEntregar: ITareaParaEntregar = {
//   titulo: "Proyecto Integrador M3",
//   completada: false,
//   fechaLimite: "2024-03-14",
// };

// console.log(tarea);
// console.log(tareaParaEntregar);
*/