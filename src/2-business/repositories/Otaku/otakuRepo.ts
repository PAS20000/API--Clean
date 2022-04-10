import { Otaku } from "../../../1-domain/entities/otaku";
import { IEroors } from "../../../utils/errors/Errors";

export interface otakuRepo {
    findById( id: string ) : Promise<Otaku | IEroors>
    findByEmail( email: string ) : Promise<Otaku | IEroors>
    findByOffices( offices:string ) : Promise<Otaku[] | IEroors>
}