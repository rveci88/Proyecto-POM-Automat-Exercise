import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../Pages/Login_Page'
import { CartPage } from '../Pages/Cart_Page'
import { HomePage } from '../Pages/Home_Page'
import { RegisterP } from '../Pages/Registro_Page'
import { ProductPage } from '../Pages/Products_Page'


type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  homePage: HomePage;
  registerPage: RegisterP;
};
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

   productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

   cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

   homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

   registerPage: async ({ page }, use) => {
    await use(new RegisterP(page));
  }
});
export { expect };