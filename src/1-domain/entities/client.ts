import { Entity } from "../core/Entity"

export interface IClient {
    id?:string
    dev_id:string
    name:string
    email:string
    avatar?:string
    password:string
    createdAt?:Date
}


export class Client extends Entity<IClient> {
   constructor(props:IClient, id?:string){
       super(props,id)
   }

    static create(props:IClient, id?:string) {

        const client = new Client({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return client
    }
}