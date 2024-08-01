import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";


const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    findByUsername: async function (username:string): Promise<Credential | null> {
        const user : Credential | null  = await this.findOne({where:{username}}) ;
        return user;
    },
    

}); 

export default CredentialRepository;