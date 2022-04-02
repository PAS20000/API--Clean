import { Errors } from "../../utils/errors/Errors"
import { Entity } from "../core/Entity"

export interface IProduct {
    id?:string
    client_id:string
    title:string
    category:string
    images:Array<string>
    movie?:string
    price:number
    descount?:number
    description:string
    in_stock:number
    createdAt?:Date
}



export class Product extends Entity<IProduct> {
    constructor(props:IProduct, id?:string){
        super(props, id)
    }
 
     static create(props:IProduct, id?:string) {
         
         const product = new Product({
             ...props,
             createdAt: props.createdAt ?? new Date()
         }, id)
 
         return product
     }
 }