import { IOtaku, Otaku } from "../../../../1-domain/entities/otaku"
import { IEroors } from "../../../../utils/errors/Errors"
import { InmemoryOtakuRepo } from "../../../repositories/Otaku/in-memory-otakuRepo"
import { CreateOtaku } from "./CreateOtaku"

const otaku = {
    email:'teste@protonmail.com',
    name:'name',
    password:'12345',
}

export type Repeats= {
    repeatPassword:string
    repeatEmail:string
    insertInMemoryOtakuRepo?:boolean
}

export async function OtakuFactory(otaku:IOtaku, {repeatPassword, repeatEmail, insertInMemoryOtakuRepo }:Repeats):Promise<Otaku | IEroors>{
    const { email, name, password, offices } = otaku
    const otakuRepo = new InmemoryOtakuRepo()
    const sut = new CreateOtaku(
        otakuRepo
    )
    
    const OTAKU = Otaku.create({
        email,
        name,
        password,
        offices
   })

   if(insertInMemoryOtakuRepo){
        otakuRepo.otakus.push(OTAKU)
   }

   const resp = await sut.execute(OTAKU.props, { repeatPassword:repeatPassword, repeatEmail:repeatEmail, })
   //console.warn(resp)

    return resp
}

describe('Otaku Domain', () => {
    test('Must not create existing otaku in database' , async () => {

       const resp = await OtakuFactory({
            email:'pas@gmail.com',
            name:'pas',
            password:'222',
       }, {repeatEmail:'pas@gmail.com', repeatPassword:'222', insertInMemoryOtakuRepo:true})
    
       expect(resp).toHaveProperty('error', true)
       expect(resp).toHaveProperty('_id', 4)
    })
   
   test('Should not create otaku with invalid provider email' , async () => {
        const resp = await OtakuFactory({
            email:'@fakeProvider',
            name:'name',
            password:'12345',
        }, {repeatEmail:'@fakeProvider', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 3)
   })

   test('Should not create otaku with invalid repeatEmail', async () => {
       
        const resp = await OtakuFactory(otaku, { repeatPassword:otaku.password , repeatEmail:'' })
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 2)
   })
   test('Should not create otaku with invalid repeatPassword', async () => {
        const resp = await OtakuFactory(otaku, {repeatEmail:otaku.email, repeatPassword:'00'})
    
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 2)
    })
    test('Should not create otaku with invalid email', async () => {
        const resp = await OtakuFactory({
            email:'testeprotonmail.com',
            name:'name',
            password:'12345',
        },{repeatEmail:'testeprotonmail.com', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 1)
    })
    test('Should not create otaku with invalid email/repeatEmail length', async () => {
    
        const resp = await OtakuFactory({
            email:'testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee@protonmail.com',
            name:'name',
            password:'12345',
        }, {repeatEmail:'testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee@protonmail.com', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 9)
    })
    test('Should not create otaku with invalid name length', async () => {

        const resp = await OtakuFactory({
            email:'teste@protonmail.com',
            name:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            password:'12345',
        }, {repeatEmail:'teste@protonmail.com', repeatPassword:'12345'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 9)
    })
    test('Should not create otaku with invalid password/repeatPassword length', async () => {

        const resp = await OtakuFactory({
            email:'teste@protonmail.com',
            name:'name',
            password:'123455555555555555555555',
        }, { repeatPassword:'123455555555555555555555' , repeatEmail:'teste@protonmail.com'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 9)
    })
    test('Should not create otaku with invalid name null', async () => {
         
        const resp = await OtakuFactory({
            email:'teste@protonmail.com',
            name:null,
            password:'12345',
        }, { repeatPassword:'12345' , repeatEmail:'teste@protonmail.com'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 5)
    })
    test('Should not create otaku with invalid password null', async () => {    

        const resp = await OtakuFactory({
            email:'teste@protonmail.com',
            name:'name',
            password:null,
        }, { repeatPassword:null , repeatEmail:'teste@protonmail.com'})
        
        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('_id', 5)
    })
    test('otaku created', async () => {

        const resp = await OtakuFactory(otaku, { repeatPassword:otaku.password, repeatEmail:otaku.email })
    
        expect(resp).toHaveProperty('_id')
        expect(resp).toHaveProperty('props', resp.props)
   })
})
