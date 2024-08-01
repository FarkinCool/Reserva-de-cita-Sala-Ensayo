import ICredentialData from "../dtos/ICredential";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import CredentialRepository from "../repositories/CredentialRepository";
import UserRepository from "../repositories/UserRepository";

export const newCredentialService = async (credentialData: ICredentialData):Promise<Credential> => {
    const {username, password } = credentialData;
    
    try {
        const existUser: Credential | null = await CredentialRepository.findByUsername(username);
        if (existUser) {
            const existMail = await UserRepository.findByMail(existUser.id);
       
            if(existMail){
                throw new Error("Email already exists");
            }
            throw new Error("Username already exists");
        }
        const newCrendential : Credential = CredentialRepository.create({username, password});
        await CredentialRepository.save(newCrendential);
        return newCrendential;
    } catch (error:any) {
        throw error.message;
    }    
}

export const checkUserService = async(credentialData: ICredentialData) : Promise<Credential> => {
    const {username, password } = credentialData;
    const existUser = await CredentialRepository.findByUsername(username);
    if(existUser){
        if(existUser.password === password){
            return existUser;
        }
        else
            throw Error("credentials are incorrect"); 
    }
    else
        throw Error("credentials are incorrect");
}