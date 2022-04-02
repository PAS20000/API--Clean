import { Dev } from "../../../1-domain/entities/dev";
import { Errors, IEroors } from "../../../utils/errors/Errors";
import { devRepo } from "./devRepo";

export class InmemoryDevRepo implements devRepo {
    public devs:Dev[] = []
    

    async findByEmail(email: string): Promise<Dev | IEroors> {
        const dev = this.devs.find(dev => dev.props.email === email)
       
        if(dev){
            //console.warn(dev)
            return Errors({params:[dev.props.email],code:4})
        }

        return null
    }
    async findById(id: string): Promise<Dev | IEroors> {
        const dev = this.devs.find(dev => dev.id === id)

        if(dev){
            return Errors({params:[dev.props.id],code:4})
        }

        return null
    }
}