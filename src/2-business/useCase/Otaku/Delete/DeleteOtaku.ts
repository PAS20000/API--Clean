import { Otaku } from "../../../../1-domain/entities/otaku";
import { Errors, IEroors } from "../../../../utils/errors/Errors";
import { otakuRepo } from "../../../repositories/Otaku/otakuRepo";


export class DeleteOtaku {
    constructor(
        private otakuRepo:otakuRepo
    ){}


    async execute (id:string, password:string) : Promise<Otaku | IEroors > {
        const otaku = await this.otakuRepo.findById(id)
        
        if(!otaku){
            return Errors({props:['otaku_id: ' + id], _id:6, file:'DeleteOtaku.ts'})
        }

        if(otaku.props.password === password){
            return otaku
        }

        return Errors({props:[`otakud_id: ${id} and password: ${password}`], _id:7, file:'DeleteOtaku.ts'})
    }
}