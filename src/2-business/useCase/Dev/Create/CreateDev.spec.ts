import { Dev, IDev } from "../../../../1-domain/entities/dev"
import { IEroors } from "../../../../utils/errors/Errors"
import { InmemoryDevRepo } from "../../../repositories/Dev/in-memory-devRepo"
import { CreateDev } from "./CreateDev"


const dev = {
    email:'teste@protonmail.com',
    name:'name',
    password:'12345',
    signature:{ 
        free:true, 
        gold:false, 
        platinum:false,
    },
}

type Repeats= {
    repeatPassword:string
    repeatEmail:string
    insertInMemoryDevRepo?:boolean
}

async function DevFactory(dev:IDev, {repeatPassword, repeatEmail, insertInMemoryDevRepo }:Repeats):Promise<Dev | IEroors>{
    const { email, name, password, signature } = dev
    const devRepo = new InmemoryDevRepo()
    const sut = new CreateDev(
        devRepo
    )
    
    const DEV = Dev.create({
        email,
        name,
        password,
        signature
   })

   if(insertInMemoryDevRepo){
        devRepo.devs.push(DEV)
   }

   const resp = await sut.execute(DEV.props, { repeatPassword:repeatPassword, repeatEmail:repeatEmail, })
   //console.warn(resp)

    return resp
}

describe('Dev Domain', () => {
    test('Must not create existing dev in database' , async () => {

       const resp = await DevFactory({
            email:'pas@gmail.com',
            name:'pas',
            password:'222',
            signature:{free:true, gold:false, platinum:false},
       }, {repeatEmail:'pas@gmail.com', repeatPassword:'222', insertInMemoryDevRepo:true})
       
       expect(resp).toHaveProperty('error', true)
       expect(resp).toHaveProperty('code', 4)
    })

   test('Should not create dev with invalid provider email' , async () => {
        const resp = await DevFactory({
            email:'@fakeProvider',
            name:'name',
            password:'12345',
            signature:{ 
                free:true, 
                gold:false, 
                platinum:false,
            }
        }, {repeatEmail:'@fakeProvider', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 3)
   })

   test('Should not create dev with invalid repeatEmail', async () => {
       
        const resp = await DevFactory(dev, { repeatPassword:dev.password , repeatEmail:'' })
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 2)
   })
   test('Should not create dev with invalid repeatPassword', async () => {
        const resp = await DevFactory(dev, {repeatEmail:dev.email, repeatPassword:'00'})
    
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 2)
    })
    test('Should not create dev with invalid email', async () => {
        const resp = await DevFactory({
            email:'testeprotonmail.com',
            name:'name',
            password:'12345',
            signature:{ 
                free:true, 
                gold:false, 
                platinum:false,
            },
        },{repeatEmail:'testeprotonmail.com', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 1)
    })
    test('Should not create dev with invalid email/repeatEmail length', async () => {
    
        const resp = await DevFactory({
            email:'testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee@protonmail.com',
            name:'name',
            password:'12345',
            signature:{ 
                free:true, 
                gold:false, 
                platinum:false,
            },
        }, {repeatEmail:'testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee@protonmail.com', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 9)
    })
    test('Should not create dev with invalid name length', async () => {

        const resp = await DevFactory({
            email:'teste@protonmail.com',
            name:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            password:'12345',
            signature:{ 
                free:true, 
                gold:false, 
                platinum:false,
            },
        }, {repeatEmail:'teste@protonmail.com', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 9)
    })
    test('Should not create dev with invalid password/repeatPassword length', async () => {
        const resp = await DevFactory({
            email:'teste@protonmail.com',
            name:'name',
            password:'123455555555555555555555',
            signature:{ 
                free:true, 
                gold:false, 
                platinum:false,
            },
        }, { repeatPassword:'123455555555555555555555' , repeatEmail:'teste@protonmail.com'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 9)
    })
    test('Should not create dev with invalid name null', async () => {
         
        const resp = await DevFactory({
            email:'teste@protonmail.com',
            name:null,
            password:'12345',
            signature:{ 
                free:true, 
                gold:false, 
                platinum:false,
            },
        }, { repeatPassword:'12345' , repeatEmail:'teste@protonmail.com'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 5)
    })
    test('Should not create dev with invalid password null', async () => {    
        const resp = await DevFactory({
            email:'teste@protonmail.com',
            name:'name',
            password:null,
            signature:{ 
                free:true, 
                gold:false, 
                platinum:false,
            },
        }, { repeatPassword:null , repeatEmail:'teste@protonmail.com'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 5)
    })
    test('Should not create dev with invalid signature null', async () => {
      
    
        const resp = await DevFactory({
            email:'teste@protonmail.com',
            name:'name',
            password:'12345',
            signature:null
        }, { repeatPassword:'12345' , repeatEmail:'teste@protonmail.com'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 5)
    })
    test('Dev created', async () => {
        const resp = await DevFactory(dev, { repeatPassword:dev.password, repeatEmail:dev.email })
    
        expect(resp).toBeTruthy()
   })
})
