export interface IEroors{
    params?:Array<string>
    code:number
}


export function Errors({params,code}:IEroors) {
    
    const errors = {
       1:`Badly formatted ${params[0]}}`,
       2:`Them params ${params[0]} ${params[1]} not match`,
       3:`This email: ${params[0]} not suportted providers: [ ${params[1]}]`,
       4:`Exist ${params[0]} in database.`,
       5:`${params[0]} null`,
       6:`Does ${params[0]} not exist in the database`,
       9:`Invalid lengths`
    }

    const message = errors[code]

    if(!message){
        console.warn(errors)

        return{
            error: false,
            code:code,
            message:`Code: ${code} error does not exist`
        }
    }

    return {
        error:true,
        code:code,
        message
    }
}