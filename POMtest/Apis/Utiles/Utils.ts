import { faker } from '@faker-js/faker/locale/es'

export const ApiData={
    username:"admin",
    password:"password123",
    Base_ApiUrl:'https://restful-booker.herokuapp.com/',
    firstname:()=> faker.person.firstName(),
    lastname:()=> faker.person.lastName(),
}