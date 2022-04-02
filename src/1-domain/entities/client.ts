import { Errors } from "../../utils/errors/Errors"
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
        const { name, email, password, dev_id } = props

        if(!name){
            return Errors([name], 9)
        }
        if(!email){
            return Errors([email], 9)
        }
        if(!password){
            return Errors([password], 9)
        }
        if(!dev_id){
            return Errors([dev_id], 9)
        }

        const client = new Client({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return client
    }
}