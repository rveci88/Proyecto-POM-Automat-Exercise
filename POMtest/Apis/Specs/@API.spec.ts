import {test, expect} from '../../Fixtures/FixtureAPI'
import { ApiData } from '../Utiles/Utils'

test.describe('API Tests Positive',()=>{
test('Obtener token', async({authService})=>{
    const response=await authService.createToken()
    const body=await response.json()
    expect(response.status()).toBe(200)
    expect(body.token).toBeTruthy()
})

test('Crear reserva', async({bookingService})=>{
    const response= await bookingService.CreateBookin()
    const body=await response.json()
    expect(response.status()).toBe(200)
    expect(body.bookingid).toBeDefined()
})

test('Debería listar todas las reservas registradas', async({bookingService})=>{
    const response=await bookingService.getBooking()
    const body=await response.json()
    expect(response.status()).toBe(200)
    expect(body.length).toBeGreaterThan(0)
})

test('Obtener reserva por id', async({bookingService})=>{
    const response=await bookingService.CreateBookin()
    const body=await response.json()
    const bookinId=body.bookingid
    const response2=await bookingService.getBookingById(bookinId)
    const body2=await response2.json()
    expect(response2.status()).toBe(200)
    expect(body2.firstname).toBe(body.booking.firstname)
    expect(body2.lastname).toBe(body.booking.lastname)
})

test('Actualizar toda reserva',async({bookingService})=>{
    const response1= await bookingService.CreateBookin()
    const body2=await response1.json()
    const response2=await bookingService.updateBookingById(body2.bookingid)
    const body3=await response2.json()
    expect(response2.status()).toBe(200)
    expect(body3.firstname).not.toBe(body2.booking.firstname)
    expect(body3.lastname).not.toBe(body2.booking.lastname)
})

test('Actualizar parcialmente reserva',async({bookingService})=>{
    const firstname=await ApiData.firstname()
    const lastname=await ApiData.lastname()
    const response2= await bookingService.CreateBookin()
    const body2=await response2.json()
    const response3=await bookingService.partialUpdateBooking(body2.bookingid, firstname, lastname)
    const body3=await response3.json()
    expect(response3.status()).toBe(200)
    expect(body3.firstname).toBe(firstname)
    expect(body3.lastname).toBe(lastname)
})

test('Eliminar reserva',async({bookingService})=>{
    const response2= await bookingService.CreateBookin()
    const body2=await response2.json()
    const id=body2.bookingid
    const response3=await bookingService.deleteBooking(id)
    const body3=await response3.text()
    expect(response3.status()).toBe(201)
    expect(body3).toBe('Created')
    const verifidel=await bookingService.getBookingById(id)
    expect(verifidel.status()).toBe(404)
})
})
test.describe('API Tests Negative',()=>{
    
})
