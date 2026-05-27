import { test, expect } from '../../Fixtures/FixtureUI'
import { UserFactory, URLs } from '../Factory/Users'


test.describe('@Smoke', async ()=>{
 test('Login exitoso', async({page,loginPage,navigate})=>{
    const userDates=await UserFactory.createData()
    await loginPage.navURL()
    await loginPage.login(userDates.emailtest, userDates.passwordtest)
    await expect(page).toHaveURL(URLs.homeurl)
    await navigate.NavLogout()
    await expect(page).toHaveURL(URLs.loginurl)
  })
  test('registro exitoso', async({page,loginPage,navigate, registerPage})=>{
    await loginPage.navURL();
    const userDates=await UserFactory.createData()
    await loginPage.signup(userDates.username, userDates.email);
    await registerPage.registro(userDates.password);
    await expect(page).toHaveURL(URLs.homeurl);
    await navigate.NavDeleteAcount()
  })
  test('Verificar busqueda de producto', async({page, productPage})=>{
    const userDates=await UserFactory.createData() 
    await productPage.navproductURL()
    await productPage.Searchproduct(userDates.producto[0])
    await expect(page.getByText(userDates.producto[0]).nth(2)).toBeVisible()
  })
  test('Flujo de compra y pago', async({page, loginPage, registerPage, navigate, productPage, cartPage})=>{
    const userDates=await UserFactory.createData() 
    await loginPage.navURL()
    await loginPage.signup(userDates.username, userDates.email)
    await registerPage.registro(userDates.password)
    await expect(page).toHaveURL(URLs.homeurl)
    await productPage.navproductURL()
    await productPage.Searchproduct(userDates.producto[0])
    await productPage.AddCarrito(userDates.cantidadproducto)
    await cartPage.FlujoPago()
    await expect(page).toHaveURL(URLs.homeurl)
    await navigate.NavDeleteAcount()
  })
})