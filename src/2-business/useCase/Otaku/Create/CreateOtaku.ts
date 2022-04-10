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
            return Errors({props:['name'], _id:5, file:'CreateOtaku.ts'})
        }
        if(!email){
            return Errors({props:['email'], _id:5, file:'CreateOtaku.ts'})
        }
        if(!password){
            return Errors({props:['password'], _id:5, file:'CreateOtaku.ts'})
        }

        if(existOtaku){
            return Errors({props:[email], _id:4, file:'CreateOtaku.ts'})
        }

        if(!email.split('').includes('@')){
            return Errors({props:[email], _id:1, file:'CreateOtaku.ts'})
        }
        if(existInArray === -1){
            return Errors({props:[email, providersEmailArray.toString()], _id:3, file:'CreateOtaku.ts'})
        }
        if(
            email.length > 48 || 
            repeatEmail && repeatEmail.length > 48 || 
            password && password.length > 16 || 
            repeatPassword && repeatPassword.length > 16 || 
            name && name.length > 48
        )
            {
                return Errors({props:[], _id:9, file:'CreateOtaku.ts'})
            }
        if(password !== repeatPassword){
            return Errors({props:[password, repeatPassword], _id:2, file:'CreateOtaku.ts'})

        }
        if(email !== repeatEmail){
            return Errors({props:[email, repeatEmail], _id:2, file:'CreateOtaku.ts'})
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