import { test, expect } from '../Fixtures/Fixture';
import { userData } from '../Data/Users';

test.describe('Test de Login', async ()=>{
  test('Login exitoso', async({page,loginPage,registerPage,homePage})=>{
    await loginPage.LoginURL();
    await loginPage.signup(userData.name, userData.email);
    await registerPage.registro(userData.password);
    await page.getByText('Continue').click();
    await homePage.Logout();
    await loginPage.login(userData.email, userData.password);
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
    await page.getByText('Continue').click();
  });
  test('Login con email incorrect', async ({page,loginPage})=>{
    await loginPage.LoginURL();
    await loginPage.login('wrongemail@gmail', userData.password);  //correo falta el .com
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con password incorrect', async ({page,loginPage})=>{
    await loginPage.LoginURL();
    await loginPage.login(userData.email, 'Isildur88');  //password incorrecta
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con email vacio', async ({page, loginPage})=>{
    await loginPage.LoginURL();
    await loginPage.login('', userData.password);  //correo vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
  test('Login con password vacia', async ({page, loginPage})=>{
    await loginPage.LoginURL();
    await loginPage.login(userData.email, '');  //password vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
  test('Login con password y correo vacios', async ({page, loginPage})=>{
    await loginPage.LoginURL();
    await loginPage.login('', '');  //password y email vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
});
test.describe('Test de Registro', async ()=>{
  test('registro exitoso', async({page,loginPage,registerPage,homePage})=>{
    await loginPage.LoginURL();
    await loginPage.signup(userData.name,'laisi93@gmail.com');
    await registerPage.registro(userData.password);
    await page.getByText('Continue').click();
    await expect(page).toHaveURL('https://automationexercise.com');
    await homePage.Deleteacount();
  });
  test('registro con email existente', async({page,loginPage})=>{
    await loginPage.LoginURL();
    await loginPage.signup(userData.name, 'pruebaveci@gmail.com');
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
  test('registro con campos obligatorios vacios', async({page,loginPage})=>{
    await page.goto(userData.loginurl);
    await loginPage.signup(userData.name, 'laisi93@gmail.com');
    await expect(page).toHaveURL(userData.registrourl);
    await page.getByRole('button', {name:'Create Account'}).click();
    await expect(page).toHaveURL(userData.registrourl);
  });
  test('registro con campos password muy corta', async({page,loginPage,registerPage,homePage})=>{
    await page.goto(userData.loginurl);
    await loginPage.signup('Prueba00', 'prueba00@gmail.com');
    await expect(page).toHaveURL(userData.registrourl);
    await registerPage.registro('Isi');
    await page.getByText('Continue').click();
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
  });
});
test.describe('Test Flujos de compra', async ()=>{
  test('Verificar busqueda de producto', async({page, productPage})=>{
     await page.goto(userData.producturl);
     await productPage.Searchproduct('Men Tshirt');
     await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible();
  }); 
  test('Agregar producto al carrito y eliminarlo', async({page, productPage, cartPage})=>{
    await page.goto(userData.producturl);
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link',{name:'View Cart'}).click();
    await expect(page.locator('tr',{hasText:'Men Tshirt'})).toBeVisible();
    await cartPage.Deletecart();
    await expect(page.locator('tr',{hasText:'Men Tshirt'})).not.toBeVisible();
  });
  test('Verificar cantidad comprada en el carrito', async({page, productPage, cartPage})=>{
    await page.goto(userData.producturl);
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link', {name:'View Cart'}).click();
    await expect(page.locator('tr',{hasText:'Men Tshirt'}).locator('td').nth(3)).toContainText('5');
    await cartPage.Deletecart();
  });
  test('Flujo de compra y pago', async({page, loginPage, registerPage, homePage, productPage, cartPage})=>{
    await page.goto(userData.loginurl);
    await loginPage.signup(userData.name, 'laisi94@gmail.com');
    await registerPage.registro(userData.password);
    await page.getByText('Continue').click();
    await expect(page).toHaveURL(userData.homeurl);
    await page.goto(userData.producturl);
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link', {name:'View Cart'}).click();
    await cartPage.FlujoPago();
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
  });
  test('realizar pedido y loguearse despues',async({page, productPage, cartPage, loginPage, registerPage, homePage})=>{
    await page.goto(userData.producturl);
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link',{name:'View Cart'}).click();
    await page.getByText('Proceed to Checkout').click();
    await page.getByRole('link', {name:'Register / Login'}).click();
    await loginPage.signup('laisi96', 'laisi96@gmail.com');
    await registerPage.registro(userData.password);
    await page.goto(userData.carturl);
    await cartPage.FlujoPago();
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
  });
  test('Eliminar 1 producto del carrito', async({page, productPage, cartPage})=>{
    await page.goto(userData.producturl);
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link',{name:'View Cart'}).click();
    await cartPage.Deletecart();
    await expect(page.locator('tr',{hasText:userData.producto})).not.toBeVisible();
  });
  test('Verificar monto de la compra', async({page, productPage, cartPage})=>{
    await page.goto(userData.producturl);
    await productPage.Searchproduct('Blue Top');
    await productPage.AddCarrito('7');
    await page.getByRole('link',{name:'View Cart'}).click();
    const precio=await page.locator('tr',{hasText:'Blue Top'}).locator('td').nth(2).textContent();
    const cantidad=await page.locator('tr',{hasText:'Blue Top'}).locator('td').nth(3).textContent();
    const montototal=await page.locator('tr',{hasText:'Blue Top'}).locator('td').nth(4).textContent();
    const montototalentero=parseInt(montototal!.replace(/\D/g,''));
    const verifimonto= await cartPage.VerifyShop(precio!, cantidad!);
    expect(montototalentero).toBe(verifimonto);
  });
  test('Agregar al carrito desde marca', async({page})=>{
    await page.goto(userData.producturl);
    await page.getByRole('link', { name: '(6) Polo' }).click();
    await expect(page.getByText('Brand - Polo Products')).toBeVisible();
    await page.getByRole('link', { name: ' View Product' }).first().click();
    await page.fill("//input[@id='quantity']", '4');
    await page.getByRole('button', {name:'Add to cart'}).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page).toHaveURL(userData.carturl);
    await page.locator('.cart_quantity_delete').click();
  });
});
test.describe('Validaciones', async()=>{
  test('validar Contact us', async({page, homePage })=>{
    await homePage.HomeURL();
    await page.getByRole('link', {name:'Contact us'}).click();
    await expect(page.getByText('Get In Touch')).toBeVisible();
    await page.getByRole('textbox', { name: 'Name' }).fill('Laisi');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill(`laisi${Math.floor(100 + Math.random() * 900)}@gmail.com`);
    await page.getByRole('textbox', { name: 'Subject' }).fill('Test Subject');
    await page.getByRole('textbox', { name: 'Your Message Here' }).fill('This is a test message for the contact us form.');
    await page.waitForTimeout(2000);
    page.once('dialog', async dialog => {
    console.log('DIALOG DETECTADO:', dialog.message());
    await dialog.accept();
    });
    await page.getByRole('button', { name: 'Submit' }).click();  
    await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
    await page.getByRole('link').filter({ hasText: /Home/ }).nth(1).click();
    await expect(page).toHaveURL(userData.homeurl);
  });
  test('Verificar pagina Test Case', async({page, homePage })=>{
    await homePage.HomeURL();
    await page.getByRole('link', { name: ' Test Cases' }).click();
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');
  });
});