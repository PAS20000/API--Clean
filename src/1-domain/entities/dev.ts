import { Entity } from "../core/Entity"

export interface IDev {
    id?:string
    name:string
    email:string
    avatar?:string
    password:string
    signature:{
        free:boolean,
        gold:boolean,
        platinum:boolean
    }
    createdAt?:Date
}


export class Dev extends Entity<IDev> {
   constructor(props:IDev, id?:string){
       super(props, id)
   }

    static create(props:IDev, id?:string){
        
        const dev = new Dev({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return dev
    }
}