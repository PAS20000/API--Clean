import { Dev } from "../../../1-domain/entities/dev";
import { IEroors } from "../../../utils/errors/Errors";

export interface devRepo {
    findById( id: string ) : Promise<Dev | IEroors>
    findByEmail( email: string ) : Promise<Dev | IEroors>
}