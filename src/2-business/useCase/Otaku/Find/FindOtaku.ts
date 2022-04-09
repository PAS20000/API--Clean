import { Otaku } from "../../../../1-domain/entities/otaku";
import { Errors, IEroors } from "../../../../utils/errors/Errors";
import { otakuRepo } from "../../../repositories/Otaku/otakuRepo";


export class FindOtakuById {
    constructor(
        private otakuRepo:otakuRepo
    ){}


    async execute (id:string) : Promise<Otaku | IEroors> {
        const otaku = await this.otakuRepo.findById(id)
        
        if(!otaku){
            return Errors({params:['otaku_id: ' + id], code:6})
        }

        return otaku
    }
}

export class FindOtakuByEmail {
    constructor(
        private otakuRepo:otakuRepo
    ){}

    async execute (email:string) : Promise<Otaku | IEroors> {
        const otaku = await this.otakuRepo.findById(email)
        
        if(!otaku){
            return Errors({params:['otaku_email: ' + email], code:6})
        }

        return otaku
    }
}