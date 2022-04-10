import { Entity } from "../core/Entity"

export interface IOtaku {
    id?:string
    name:string
    email:string
    avatar?:string
    password:string
    offices?:Array<string>
    uploads?:Array<string>
    createdAt?:Date
}


export class Otaku extends Entity<IOtaku> {
   constructor(props:IOtaku, id?:string){
       super(props, id)
   }

    static create(props:IOtaku, id?:string){
        
        const otaku = new Otaku({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return otaku
    }
}