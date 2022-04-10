export interface IEroors{
    props?:any
    _id:number
    file:string | null
}


export function Errors({props, _id, file}:IEroors) {
    
    const errors = {
       1:`Badly formatted ${props[0]}}`,
       2:`Them props ${props[0]} ${props[1]} not match`,
       3:`This email: ${props[0]} not suportted providers: [ ${props[1]}]`,
       4:`Exist ${props[0]} in database.`,
       5:`${props[0]} null`,
       6:`Does ${props[0]} not exist in the database`,
       7:`${props[0]} is not authorized`,
       9:`Invalid lengths`
    }

    const message = errors[_id]

    if(!message){
        console.warn(errors)

        return{
            error: false,
            _id,
            message:`Code: ${_id} error does not exist`,
            file:null
        }
    }

    return {
        error:true,
        _id,
        message,
        file
    }
}