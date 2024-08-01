
import IUserData from "../dtos/IUser";
import { User } from "../entities/User";
import {newCredentialService} from "../services/credentialService";
import UserRepository from "../repositories/UserRepository";
import ICredentialData from "../dtos/ICredential";
import { Credential } from "../entities/Credential";
import { AppDataSource } from "../config/data-source";
import fs from "fs";


export const createUserService =  async(userData:IUserData): Promise<User> => {
    const {name, email,birthdate,dDni,username,password, imagen, imagen64} = userData;
    const credentialData :ICredentialData  = {username, password};
    let ruta = './src/public/img/'+imagen;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
        const newCrendential: Credential = await newCredentialService(credentialData);
        if(!newCrendential){
           throw new Error("Credentials exists!")
        }
        if(fs.existsSync(ruta)){ // Verifica si la imagen existe
            const result = { mensaje: "La imagen ya existe" };
            const dotIndex = imagen.lastIndexOf('.');
            let newImage = imagen.slice(0, dotIndex);
            const extension = imagen.slice(dotIndex);
            newImage = newImage+newCrendential.id+extension;

            ruta = './src/public/img/'+newImage;
            // throw new Error( String(result));
        }
        const buffer = Buffer.from(imagen64, 'base64');
        fs.writeFileSync(ruta  , buffer);
        
        const newUser : User = UserRepository.create({name,email,birthdate,dDni,image:imagen, status:"active",credential: newCrendential});
        await queryRunner.manager.save(newUser);    
        await queryRunner.commitTransaction();
        return newUser;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("error in createUser", error);
        throw error;
    } finally{
        await queryRunner.release();
    } 
    
};

export const getUserService = async() :Promise<User[]>=> {  
    const users: User[]= await UserRepository.find({
        relations: { appointments: true}
    });
    return users;
};

export const findByIdUserService = async(id:number):Promise<User > => {
    const user: User | null = await UserRepository.findOne({
        where:{id},
        relations: ["appointments"]
    });
    if(!user) throw new Error("user not found");
    return user;
};
