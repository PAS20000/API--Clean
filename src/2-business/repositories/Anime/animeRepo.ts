import { Anime } from "../../../1-domain/entities/anime";
import { IEroors } from "../../../utils/errors/Errors";

export interface AnimeReopo {
    findById(id:string ) : Promise<Anime | IEroors>
    findByTitle(title:string ) : Promise<Anime | IEroors>
    findByCategory(categgory:string) : Promise<Anime | IEroors>
}