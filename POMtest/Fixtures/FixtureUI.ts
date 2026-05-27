import { test as base, expect } from '@playwright/test'
import { CartPage } from '../UI/Pages/Cart_Page'
import { HomePage } from '../UI/Pages/Home_Page'
import { RegisterP } from '../UI/Pages/Registro_Page'
import { ProductPage } from '../UI/Pages/Products_Page'
import { LoginPage } from '../UI/Pages/Login_Page'
import { Navigate } from '../UI/Components/Navegacion'
import { UserFactory } from '../UI/Factory/Users'


type MyFixtures = {
  loginPage: LoginPage
  productPage: ProductPage
  cartPage: CartPage
  homePage: HomePage
  registerPage: RegisterP
  navigate:Navigate
  userFactory:UserFactory
};
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage=new LoginPage(page)
    await use(loginPage)
  },

  productPage: async ({ page }, use) => {
    const productPage=new ProductPage(page)
    await use(productPage)
  },

  cartPage: async ({ page }, use) => {
    const cartPage=new CartPage(page)
    await use(cartPage)
  },

  homePage: async ({ page }, use) => {
    const homePage=new HomePage(page)
    await use(homePage)
  },

  registerPage: async ({ page }, use) => {
    const registerPage=new RegisterP(page)
    await use(registerPage)
  },
  navigate: async ({ page }, use) => {
    const navigate=new Navigate(page)
    await use(navigate)
  },
  userFactory: async ({ page }, use) => {
    const userFactory=new UserFactory()
    await use(userFactory)
  },

});
export { expect }