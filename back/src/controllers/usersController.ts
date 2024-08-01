import { Request, Response } from "express"
import {createUserService,getUserService,findByIdUserService} from "../services/userService";
import { checkUserService, newCredentialService } from "../services/credentialService";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import ICredentialData from "../dtos/ICredential";
import IUserData from "../dtos/IUser";
import UserRepository from "../repositories/UserRepository";


export const createUser =  async(req: Request<{},{},IUserData>, res:Response) => { 
    const {name, email, birthdate,dDni, username, password, imagen, imagen64 } = req.body;
    try {
        const newUser:User = await createUserService({name, email,birthdate,dDni,username, password,imagen,imagen64});
        const {credential, ...userWithoutCredentials} = newUser;
        const userResp = {
             ...userWithoutCredentials,            
        };
        res.status(201).json(userResp);
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
};

export const loginUser = async(req:Request<{},{},ICredentialData>, res: Response) => {
    try {
        const {username, password} = req.body;
        const newCredeDto: ICredentialData = { username, password };
        const credentials: Credential = await checkUserService(newCredeDto);
        console.error(credentials);
        const login = await UserRepository.findByCredentialId(credentials.id)
        
        if(login){
            const {credential, ...userwithoutcredentials}= login;
            const user = {...userwithoutcredentials};
            res.status(200).json({loggin: true, user,})
        }
            
    } catch (error:any) {
        res.status(400).json("los datos son incorrectos");
    }
};

export const getUsers = async(req: Request, res: Response) => {
    try {
        const users:User[] = await getUserService();
        res.status(200).json(users);
    } catch (error: any) {  /// any no unknow
        res.status(400).json({message: error.message});
    }
};

export const getUserById = async(req: Request<{id:string}, {},{}>, res: Response) => {
    const {id} = req.params;
    try {
        const user :User | null = await findByIdUserService(Number(id));
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({message : error.message});
    }

};

// export const deleteUser = async(req: Request<{id:number}, {},{}>, res: Response) => {
//     const {id} = req.params;

//     res.status(200).json({message: `el usuario con id ${id} , fue eliminado`});

// }