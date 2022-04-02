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
        const { title, category, images, price, description, in_stock, client_id } = props

         if(!client_id){
            return Errors([client_id], 9)
         }
         if(!title){
             return Errors([title], 9)
         }
         if(!category){
             return Errors([category], 9)
         }
         if(!images){
             return Errors([images.toString()], 9)
         }
         if(!price){
             return Errors([price.toString()], 9)
         }
         if(!description){
            return Errors([description], 9)
         }
         if(!in_stock){
            return Errors([in_stock.toString()], 9)
         }
 
         const product = new Product({
             ...props,
             createdAt: props.createdAt ?? new Date()
         }, id)
 
         return product
     }
 }