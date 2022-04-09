import { IOtaku,  Otaku } from "../../../../1-domain/entities/otaku";
import { Errors, IEroors } from "../../../../utils/errors/Errors";
import { otakuRepo } from "../../../repositories/Otaku/otakuRepo";


export class CreateOtaku {
    constructor(
        private otakuRepo:otakuRepo
    ){}


    async execute ({email, password, name, offices }:IOtaku, {repeatPassword, repeatEmail}) : Promise<Otaku | IEroors> {
        const existOtaku = await this.otakuRepo.findByEmail(email)
        const providersEmailArray = ['hotmail.com', 'gmail.com', 'protonmail.com', 'outlook.com']
        const existInArray = providersEmailArray.map(e => email.split('@').includes(e)).indexOf(true)
        
        if(!name){
            return Errors({params:['name'], code:5})
        }
        if(!email){
            return Errors({params:['email'], code:5})
        }
        if(!password){
            return Errors({params:['password'], code:5})
        }

        if(existOtaku){
            return Errors({params:[email], code:4})
        }

        if(!email.split('').includes('@')){
            return Errors({params:[email], code:1})
        }
        if(existInArray === -1){
            return Errors({params:[email, providersEmailArray.toString()], code:3})
        }
        if(
            email.length > 48 || 
            repeatEmail && repeatEmail.length > 48 || 
            password && password.length > 16 || 
            repeatPassword && repeatPassword.length > 16 || 
            name && name.length > 48
        )
            {
                return Errors({params:[], code:9})
            }
        if(password !== repeatPassword){
            return Errors({params:[password, repeatPassword], code:2})

        }
        if(email !== repeatEmail){
            return Errors({params:[email, repeatEmail], code:2})
        }

        const otaku = Otaku.create({
            name,
            email,
            password,
            offices: offices ?? ['OTAKU']
        })

        return otaku
    }
}