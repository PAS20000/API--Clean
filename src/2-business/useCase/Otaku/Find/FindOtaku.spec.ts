import { InmemoryOtakuRepo } from "../../../repositories/Otaku/in-memory-otakuRepo"
import { FindOtakuByEmail, FindOtakuById } from "./FindOtaku"
import crypto from 'crypto'

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
})
