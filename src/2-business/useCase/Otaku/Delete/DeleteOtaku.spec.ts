import { Otaku } from "../../../../1-domain/entities/otaku"
import { InmemoryOtakuRepo } from "../../../repositories/Otaku/in-memory-otakuRepo"
import { DeleteOtaku } from "./DeleteOtaku"

describe('Otaku Domain', () => {
   test('Otaku Deleted', async () => {
      const otakuRepo = new InmemoryOtakuRepo()
      const sut = new DeleteOtaku(
          otakuRepo
      )
      const OTAKU = Otaku.create({
         email:'whatever@gmail.com',
         name:'otaku1',
         password:'12345',
         offices:['OTAKU', 'DEV']
     })


      otakuRepo.otakus.push(OTAKU)

      const resp = await sut.execute(OTAKU.id, OTAKU.props.password)
      
      expect(resp).toHaveProperty('_id', OTAKU.id)
      expect(resp).toHaveProperty('props', OTAKU.props)
   })
   test('Otaku Deleted, not auth', async () => {
      const otakuRepo = new InmemoryOtakuRepo()
      const sut = new DeleteOtaku(
          otakuRepo
      )
      const OTAKU = Otaku.create({
         email:'whatever@gmail.com',
         name:'otaku1',
         password:'12345',
         offices:['OTAKU', 'DEV']
     })


      otakuRepo.otakus.push(OTAKU)

      const resp = await sut.execute(OTAKU.id, 'fakePassowrd')
      
      expect(resp).toHaveProperty('error', true)
      expect(resp).toHaveProperty('_id', 7)
   })

   test('Otaku Deleted, not find in database', async () => {
      const otakuRepo = new InmemoryOtakuRepo()
      const sut = new DeleteOtaku(
          otakuRepo
      )
      const OTAKU = Otaku.create({
         email:'whatever@gmail.com',
         name:'otaku1',
         password:'12345',
         offices:['OTAKU', 'DEV']
     })

      otakuRepo.otakus.push(OTAKU)

      const resp = await sut.execute('fakeID', OTAKU.props.password)
      
      expect(resp).toHaveProperty('error', true)
      expect(resp).toHaveProperty('_id', 6)
   })
})