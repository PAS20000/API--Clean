import { InmemoryOtakuRepo } from "../../../repositories/Otaku/in-memory-otakuRepo"
import { FindOtakuByEmail, FindOtakuById, FindOtakuByOffices } from "./FindOtaku"
import crypto from 'crypto'
import { Otaku } from "../../../../1-domain/entities/otaku"


describe('Otaku domain', () => {
    test('FindById otaku, does not exist in database' , async () => {
        const otakuRepo = new InmemoryOtakuRepo()
        const sut = new FindOtakuById(
            otakuRepo
        )
        const fakeId = crypto.randomBytes(32).toString('hex')

        const resp = await sut.execute(fakeId)

        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 6)
    })
    test('FindByEmail otaku, does not exist in the database' , async () => {
        const otakuRepo = new InmemoryOtakuRepo()
        const sut = new FindOtakuByEmail(
            otakuRepo
        )
        const fakeEmail = 'fake@gmail.com'

        const resp = await sut.execute(fakeEmail)

        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 6)
    })
    test('FindOtakuByOffices otaku, does not exist in the database' , async () => {
        const otakuRepo = new InmemoryOtakuRepo()
        const sut = new FindOtakuByOffices(
            otakuRepo
        )
        const fakeOffice = 'FAKE'

        const resp = await sut.execute(fakeOffice)

        expect(resp).toHaveProperty('error', true)
        expect(resp).toHaveProperty('code', 6)
    })
    test('FindOtakuById otaku, exist in the database' , async () => {
        const otakuRepo = new InmemoryOtakuRepo()
        const sut = new FindOtakuById(
            otakuRepo
        )
        
        const OTAKU = Otaku.create({
            email:'whatever@gmail.com',
            name:'1231212',
            password:'12345'
       })
       
        otakuRepo.otakus.push(OTAKU)
        const resp = await sut.execute(OTAKU.id)
        expect(resp).toHaveProperty('id')
        expect(resp).toHaveProperty('props')
    })
    test('FindOtakuByEmail otaku, exist in the database' , async () => {
        const otakuRepo = new InmemoryOtakuRepo()
        const sut = new FindOtakuByEmail(
            otakuRepo
        )
        
        const OTAKU = Otaku.create({
            email:'whatever@gmail.com',
            name:'1231212',
            password:'12345'
       })
       
        otakuRepo.otakus.push(OTAKU)
        const resp = await sut.execute(OTAKU.props.email)
        expect(resp).toHaveProperty('id')
        expect(resp).toHaveProperty('props')
    })
    test('FindOtakuByOffices otaku, exist in the database' , async () => {
        const otakuRepo = new InmemoryOtakuRepo()
        const sut = new FindOtakuByOffices(
            otakuRepo
        )
        
        const OTAKU1 = Otaku.create({
            email:'whatever@gmail.com',
            name:'otaku1',
            password:'12345',
            offices:['OTAKU', 'DEV']
        })
        const OTAKU2 = Otaku.create({
            email:'whatever2@gmail.com',
            name:'otaku2',
            password:'12345',
            offices:['OTAKU', 'DEV']
        })
        const OTAKU3 = Otaku.create({
            email:'whatever3@gmail.com',
            name:'otaku3',
            password:'12345',
            offices:['OTAKU']
        })

        otakuRepo.otakus.push(OTAKU1)
        otakuRepo.otakus.push(OTAKU2)
        otakuRepo.otakus.push(OTAKU3)

        const respDEV = await sut.execute('DEV')
        const respOTAKU = await sut.execute('OTAKU')

        expect(respDEV).toContain(OTAKU1)
        expect(respDEV).toContain(OTAKU2)
        expect(respOTAKU).toContain(OTAKU1)
        expect(respOTAKU).toContain(OTAKU2)
        expect(respOTAKU).toContain(OTAKU3)
    })
})
