const { faker } = require('@faker-js/faker/locale/es');

export class UserFactory {
  static createData() {
    return {
      emailtest: 'retest100@gmail.com',
      passwordtest: 'Isildur88*',
      cantidadproducto: faker.number.int({min:1, max:10}).toString(),
      producto:['Men Tshirt', 'Blue Top'],
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.username(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      country: faker.location.country(),
      state: faker.location.state(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      phoneNumber: faker.phone.number(),
      birthDay: faker.number.int({ min: 1, max: 31 }).toString(),
      birthMonth: faker.number.int({ min: 1, max: 12 }).toString(),
      birthYear: faker.number.int({ min: 1950, max: 2020 }).toString(),
    }
  }
}

export const URLs = {
  homeurl: 'https://automationexercise.com/',
  loginurl: 'https://automationexercise.com/login',
  registrourl: 'https://automationexercise.com/signup',
  producturl:'https://automationexercise.com/products',
  carturl:'https://automationexercise.com/view_cart',
  enpointAllProduct:'https://automationexercise.com/api/productsList',
  endpointBrandList:'https://automationexercise.com/api/brandsList',
  endpointSearch:'https://automationexercise.com/api/searchProduct',
  endpointVerifyLogin: 'https://automationexercise.com/api/verifyLogin',
};


