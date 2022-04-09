import { Entity } from "../core/Entity"

export interface IAnime {
    id?:string
    adm_id:string
    verify:boolean
    title:string
    categorys:Array<string>
    thumb?:string
    episodes:Array<string>
    synopsis:string
    createdAt?:Date
}



export class Anime extends Entity<IAnime> {
    constructor(props:IAnime, id?:string){
        super(props, id)
    }
 
     static create(props:IAnime, id?:string) {
         
         const anime = new Anime({
             ...props,
             createdAt: props.createdAt ?? new Date()
         }, id)
 
         return anime
     }
 }