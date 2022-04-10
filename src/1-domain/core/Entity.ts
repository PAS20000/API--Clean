import crypto from 'crypto'


export class Entity<T> {
    protected _id:string
    public props:T

    
    get id() : string {
        return this._id
    }

    constructor(props:T, id?:string) {
        this._id = id ?? crypto.randomBytes(64).toString('hex')
        this.props = props
    }
}
