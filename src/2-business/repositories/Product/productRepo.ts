import { Product } from "../../../1-domain/entities/product";
import { IEroors } from "../../../utils/errors/Errors";

export interface ProductReopo {
    findById( id: string ) : Promise<Product | IEroors>
    findByTitle( title: string ) : Promise<Product | IEroors>
}