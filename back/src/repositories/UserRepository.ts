import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import CredentialRepository from "./CredentialRepository";

const UserRepository = AppDataSource.getRepository(User).extend({
    findByCredentialId: async function(id: number): Promise<User | null>{
        console.log(id);
        const findCredential = this.findOne({
            where:{
                credential:{id}
            }, 
            relations: ["credential"]
            //by credentila: {id : credentilId}
        });
        console.log(findCredential);
        if(!findCredential) throw new Error ("User not found");
        return findCredential;
    },

    findByMail: async function (id: number): Promise<boolean>{
        const findId : User | null= await this.findByCredentialId(id);
        if(!findId){
            return false;
        }
        const mail : User | null= await this.findOne({where:{email: findId.email}});
        if (mail) return true;
        else return false;
    },


});

export default UserRepository;