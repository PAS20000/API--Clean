import { Otaku } from "../../../1-domain/entities/otaku";
import { Errors, IEroors } from "../../../utils/errors/Errors";
import { otakuRepo } from "./otakuRepo";

export class InmemoryOtakuRepo implements otakuRepo {
    public otakus:Otaku[] = []
    

    async findByEmail(email: string): Promise<Otaku | IEroors> {
        const otaku = this.otakus.find(otaku => otaku.props.email === email)
       
        if(otaku){
            //console.warn(otaku)
            return otaku
        }

        return null
    }
    async findById(id: string): Promise<Otaku | IEroors> {
        const otaku = this.otakus.find(otaku => otaku.id === id)

        if(otaku){
            return otaku
        }

        return null
    }
}