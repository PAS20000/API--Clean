export interface IEroors{
    params?:Array<string>
    code:number
}


export function Errors({params,code}:IEroors) {
    
    const errors = [{
       1:`Badly formatted ${params[0]}}`,
       2:`Them params ${params[0]} ${params[1]} not match`,
       3:`This email: ${params[0]} not suportted providers: [ ${params[1]}]`,
       4:`Exist ${params[0]} in database.`,
       5:`${params[0]} null`,
       9:`Invalid lengths`
    }]

    const message = errors[0][code]

    if(!message){
        throw new Error(`${code} error does not exist`), console.warn(errors)
    }

    return {
        error:true,
        code:code,
        message
    }
}