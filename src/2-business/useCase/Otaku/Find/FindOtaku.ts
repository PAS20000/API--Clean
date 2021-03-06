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
            return Errors({props:['otaku_id: ' + id], _id:6, file:'FindOtaku.ts'})
        }

        return otaku
    }
}

export class FindOtakuByEmail {
    constructor(
        private otakuRepo:otakuRepo
    ){}

    async execute (email:string) : Promise<Otaku | IEroors> {
        const otaku = await this.otakuRepo.findByEmail(email)
        
        if(!otaku){
            return Errors({props:['otaku_email: ' + email], _id:6, file:'FindOtaku.ts'})
        }

        return otaku
    }
}

export class FindOtakuByOffices {
    constructor(
        private otakuRepo:otakuRepo
    ){}

    async execute (office:string) : Promise<Otaku[] | IEroors> {
        const otakus = await this.otakuRepo.findByOffices(office)

        if(!otakus[0]){
            return Errors({props:['otaku_office: ' + office], _id:6, file:'FindOtaku.ts'})
        }

        return otakus
    }
}