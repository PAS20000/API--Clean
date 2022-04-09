import { Client } from "../../../1-domain/entities/client";
import { IEroors } from "../../../utils/errors/Errors";

export interface clientRepo {
    findById( id: string ) : Promise<Client | IEroors>
    findByEmail( email: string ) : Promise<Client | IEroors>
}