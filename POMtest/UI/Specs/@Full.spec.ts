import { test, expect } from '../../Fixtures/FixtureUI'
import { UserFactory, URLs } from '../Factory/Users'

test.describe('Test de Login', ()=>{
  test('Login exitoso', async({page,loginPage,navigate})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL()
    await loginPage.login(userData.emailtest, userData.passwordtest)
    await expect(page).toHaveURL(URLs.homeurl)
    await navigate.NavLogout()
    await expect(page).toHaveURL(URLs.loginurl)
  });
  test('Login con email incorrect', async ({page,loginPage})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL();
    await loginPage.login('wrongemail@gmail', userData.password);  //correo falta el .com
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con password incorrect', async ({page,loginPage})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL();
    await loginPage.login(userData.email, 'hjgsad62hf');  //password incorrecta
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con email vacio', async ({page, loginPage})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL();
    await loginPage.login('', userData.password);  //correo vacio
    await expect(page).toHaveURL(URLs.loginurl);
  });
  test('Login con password vacia', async ({page, loginPage})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL();
    await loginPage.login(userData.email, '');  //password vacio
    await expect(page).toHaveURL(URLs.loginurl);
  });
  test('Login con password y correo vacios', async ({page, loginPage})=>{
    await loginPage.navURL();
    await loginPage.login('', '');  //password y email vacio
    await expect(page).toHaveURL(URLs.loginurl);
  });
});
test.describe('Test de Registro', ()=>{
  test('registro exitoso', async({page,loginPage,navigate, registerPage})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL()
    await loginPage.signup(userData.username, userData.email)
    await registerPage.registro(userData.password)
    await expect(page).toHaveURL(URLs.homeurl)
    await navigate.NavDeleteAcount()
  });
  test('registro con email existente', async({page,loginPage})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL();
    await loginPage.signup(userData.username, userData.emailtest);
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
  test('registro con campos obligatorios vacios', async({page,loginPage, registerPage})=>{
    const userData=await UserFactory.createData()
    await page.goto(URLs.loginurl);
    await loginPage.signup(userData.username, userData.email);
    await expect(page).toHaveURL(URLs.registrourl);
    await registerPage.ejecutarRegistro()
    await expect(page).toHaveURL(URLs.registrourl);
  });
  test('registro con campos password muy corta', async({page,loginPage,registerPage,navigate})=>{
    const userData=await UserFactory.createData()
    await page.goto(URLs.loginurl);
    await loginPage.signup(userData.username, userData.email);
    await expect(page).toHaveURL(URLs.registrourl);
    await registerPage.registro('Isi');
    await expect(page).toHaveURL(URLs.homeurl);
    await navigate.NavDeleteAcount()
  });
});
test.describe('Test Flujos de compra', ()=>{
  test('Verificar busqueda de producto', async({page, homePage, navigate, productPage})=>{
    const userData=await UserFactory.createData()
    await homePage.navHomeURL()
    await navigate.NavProduct()
    await productPage.Searchproduct(userData.producto[0])
    await expect(page.getByText(userData.producto[0]).nth(2)).toBeVisible()
  }); 
  test('Agregar producto al carrito y eliminarlo', async({page, productPage, cartPage, navigate, homePage})=>{
    const userData=await UserFactory.createData()
    await homePage.navHomeURL()
    await navigate.NavProduct();
    await productPage.Searchproduct(userData.producto[0]);
    await productPage.AddCarrito(userData.cantidadproducto);
    await expect(page.locator('tr',{hasText:'Men Tshirt'})).toBeVisible();
    await cartPage.Deletecart();
    await expect(page.getByText('Cart is empty!',{exact:true})).toBeVisible();
  });
  test('Verificar cantidad comprada en el carrito', async({page, homePage, navigate, productPage, cartPage})=>{
    const userData=await UserFactory.createData()
    await homePage.navHomeURL()
    await navigate.NavProduct();
    await productPage.Searchproduct(userData.producto[0]);
    await productPage.AddCarrito(userData.cantidadproducto);
    await expect(page.locator('tr',{hasText:'Men Tshirt'}).locator('td').nth(3)).toContainText(userData.cantidadproducto);
    await cartPage.Deletecart();
  });
  test('Flujo de compra y pago', async({page, loginPage, registerPage, navigate, productPage, cartPage})=>{
    const userData=await UserFactory.createData()
    await loginPage.navURL()
    await loginPage.signup(userData.username, userData.email)
    await registerPage.registro(userData.password)
    await expect(page).toHaveURL(URLs.homeurl)
    await navigate.NavProduct()
    await productPage.Searchproduct(userData.producto[0])
    await productPage.AddCarrito(userData.cantidadproducto.toString())
    await cartPage.FlujoPago()
    await expect(page).toHaveURL(URLs.homeurl)
    await navigate.NavDeleteAcount()
  });
  test('Realizar pedido y loguearse despues',async({page, homePage, productPage, cartPage, loginPage, registerPage, navigate})=>{
    const userData=await UserFactory.createData()
    await homePage.navHomeURL()
    await navigate.NavProduct()
    await productPage.Searchproduct(userData.producto[0])
    await productPage.AddCarrito(userData.cantidadproducto)
    await cartPage.proceedCheck()
    await navigate.Navlogin()
    await loginPage.signup(userData.username, userData.email)
    await registerPage.registro(userData.password)
    await navigate.NavCart()
    await cartPage.FlujoPago()
    await expect(page).toHaveURL(URLs.homeurl)
    await navigate.NavDeleteAcount()
  })
  test('Eliminar 1 producto del carrito', async({page, homePage, productPage, cartPage, navigate})=>{
    const userData=await UserFactory.createData()
    await homePage.navHomeURL()
    await navigate.NavProduct()
    await productPage.Searchproduct(userData.producto[0]);
    await productPage.AddCarrito(userData.cantidadproducto);
    await cartPage.Deletecart();
    await expect(page.getByText('Cart is empty!',{exact:true})).toBeVisible();
  });
  test('Verificar monto de la compra', async({productPage, cartPage, homePage, navigate})=>{
    const userData=await UserFactory.createData()
    await homePage.navHomeURL()
    await navigate.NavProduct()
    await productPage.Searchproduct(userData.producto[0])
    await productPage.AddCarrito(userData.cantidadproducto);
    expect(await cartPage.VerifyShop()).toBe(true)
  });
  test('Agregar al carrito desde marca', async({page, productPage, homePage, navigate})=>{
    await homePage.navHomeURL()
    await navigate.NavProduct()
    await page.getByRole('link', { name: '(6) Polo' }).click();
    await expect(page.getByText('Brand - Polo Products')).toBeVisible();
    await productPage.AddCarrito('5')
    await expect(page).toHaveURL(URLs.carturl);
  });
  test('Verificar carrito luego de loguearse', async ({page,navigate, homePage, registerPage,loginPage, productPage, cartPage})=>{
    const userData=await UserFactory.createData()
    await homePage.navHomeURL()
    await navigate.NavProduct()
    await productPage.Searchproduct(userData.producto[0])
    await productPage.AddCarrito('10')
    await navigate.Navlogin()
    await loginPage.signup(userData.username, userData.email)
    await registerPage.registro(userData.password)
    await navigate.NavCart()
    expect(await cartPage.VerifyCant(userData.producto[0])).toBe(10)
    await navigate.NavHome()
    await navigate.NavDeleteAcount()
    await expect(page.getByText('Account Deleted!')).toBeVisible()
  })
}); 
