
export const ApiData={
    username:"admin",
    password:"password123",
    Base_ApiUrl:'https://restful-booker.herokuapp.com/',
    firstname: async () => {
        const { faker } = await import('@faker-js/faker/locale/es');
        return faker.person.firstName()
    },
    lastname: async () => {
        const { faker } = await import('@faker-js/faker/locale/es');
        return faker.person.lastName()
    }
}