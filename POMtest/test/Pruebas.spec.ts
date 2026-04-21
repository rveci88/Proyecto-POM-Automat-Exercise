import { test, expect } from '@playwright/test';
import { RegisterP } from '../Pages/Registro_Page';
import { LoginPage } from '../Pages/Login_Page';
import { HomePage } from '../Pages/Home_Page';
import { userData } from '../Data/Users';
import { ProductPage } from '../Pages/Products_page';
import { CartPage } from '../Pages/Cart_Page';

let paginaLogin:LoginPage;
let paginaRegistro:RegisterP;
let paginaProd:ProductPage;
let paginaHome:HomePage;
let paginaCart:CartPage;
test.beforeEach(async({page})=>{
  paginaLogin=new LoginPage(page);
  paginaRegistro=new RegisterP(page);
  paginaProd=new ProductPage(page);
  paginaHome=new HomePage(page);
  paginaCart=new CartPage(page);
});

test.describe('Test de Login', async ()=>{
  test('Login exitoso', async({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.signup(userData.name, userData.email);
    await paginaRegistro.registro(userData.password);
    await page.getByText('Continue').click();
    await paginaHome.Logout();
    await paginaLogin.login(userData.email, userData.password);
    await expect(page).toHaveURL(userData.homeurl);
    await paginaHome.Deleteacount();
    await page.getByText('Continue').click();
    await page.pause();
  });
  test('Login con email incorrect', async ({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.login('wrongemail@gmail', userData.password);  //correo falta el .com
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con password incorrect', async ({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.login(userData.email, 'Isildur88');  //password incorrecta
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con email vacio', async ({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.login('', userData.password);  //correo vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
  test('Login con password vacia', async ({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.login(userData.email, '');  //password vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
  test('Login con password y correo vacios', async ({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.login('', '');  //password y email vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
});
test.describe('Test de Registro', async ()=>{
  test('registro exitoso', async({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.signup(userData.name,'laisi93@gmail.com');
    await paginaRegistro.registro(userData.password);
    await page.getByText('Continue').click();
    await expect(page).toHaveURL('https://automationexercise.com');
    await paginaHome.Deleteacount();
    await page.pause();
  });
  test('registro con email existente', async({page})=>{
    await paginaLogin.LoginURL();
    await paginaLogin.signup(userData.name, 'pruebaveci@gmail.com');
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
    await page.pause();
  });
  test('registro con campos obligatorios vacios', async({page})=>{
    await page.goto(userData.loginurl);
    await paginaLogin.signup(userData.name, 'laisi93@gmail.com');
    await expect(page).toHaveURL(userData.registrourl);
    await page.getByRole('button', {name:'Create Account'}).click();
    await expect(page).toHaveURL(userData.registrourl);
  });
  test('registro con campos password muy corta', async({page})=>{
    await page.goto(userData.loginurl);
    await paginaLogin.signup('Prueba00', 'prueba00@gmail.com');
    await expect(page).toHaveURL(userData.registrourl);
    await paginaRegistro.registro('Isi');
    await page.getByText('Continue').click();
    await expect(page).toHaveURL(userData.homeurl);
    await paginaHome.Deleteacount();
  });
});
test.describe('Test Flujos de compra', async ()=>{
  test('Verificar busqueda de producto', async({page})=>{
     await page.goto(userData.producturl);
     await paginaProd.Searchproduct('Men Tshirt');
     await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible();
  }); 
  test('Agregar producto al carrito y eliminarlo', async({page})=>{
    await page.goto(userData.producturl);
    await paginaProd.Searchproduct(userData.producto);
    await paginaProd.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link',{name:'View Cart'}).click();
    await expect(page.locator('tr',{hasText:'Men Tshirt'})).toBeVisible();
    await paginaCart.Deletecart();
    await expect(page.locator('tr',{hasText:'Men Tshirt'})).not.toBeVisible();
  });
  test('Verificar cantidad comprada en el carrito', async({page})=>{
    await page.goto(userData.producturl);
    await paginaProd.Searchproduct(userData.producto);
    await paginaProd.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link', {name:'View Cart'}).click();
    await expect(page.locator('tr',{hasText:'Men Tshirt'}).locator('td').nth(3)).toContainText('5');
    await paginaCart.Deletecart();
  });
  test('Flujo de compra y pago', async({page})=>{
    await page.goto(userData.loginurl);
    await paginaLogin.signup(userData.name, 'laisi94@gmail.com');
    await paginaRegistro.registro(userData.password);
    await page.getByText('Continue').click();
    await expect(page).toHaveURL(userData.homeurl);
    await page.goto(userData.producturl);
    await paginaProd.Searchproduct(userData.producto);
    await paginaProd.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link', {name:'View Cart'}).click();
    await paginaCart.FlujoPago();
    await expect(page).toHaveURL(userData.homeurl);
    await paginaHome.Deleteacount();
  });
  test('realizar pedido y loguearse despues',async({page})=>{
    await page.goto(userData.producturl);
    await paginaProd.Searchproduct(userData.producto);
    await paginaProd.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link',{name:'View Cart'}).click();
    await page.getByText('Proceed to Checkout').click();
    await page.getByRole('link', {name:'Register / Login'}).click();
    await paginaLogin.signup(userData.name, 'laisi95@gmail.com');
    await expect(page).toHaveURL(userData.registrourl);
    await paginaRegistro.registro(userData.password);
    await page.goto(userData.carturl);
    await paginaCart.FlujoPago();
    await expect(page).toHaveURL(userData.homeurl);
    await paginaHome.Deleteacount();
    await page.pause();
  });
  test('Eliminar 1 producto del carrito', async({page})=>{
    await page.goto(userData.producturl);
    await paginaProd.Searchproduct(userData.producto);
    await paginaProd.AddCarrito(userData.cantidadproducto);
    await page.getByRole('link',{name:'View Cart'}).click();
    await paginaCart.Deletecart();
    await expect(page.locator('tr',{hasText:userData.producto})).not.toBeVisible();
  });
  test('Verificar monto de la compra', async({page})=>{
    await page.goto(userData.producturl);
    await paginaProd.Searchproduct('Blue Top');
    await paginaProd.AddCarrito('7');
    await page.getByRole('link',{name:'View Cart'}).click();
    const precio=await page.locator('tr',{hasText:'Blue Top'}).locator('td').nth(2).textContent();
    const cantidad=await page.locator('tr',{hasText:'Blue Top'}).locator('td').nth(3).textContent();
    const montototal=await page.locator('tr',{hasText:'Blue Top'}).locator('td').nth(4).textContent();
    const montototalentero=parseInt(montototal!.replace(/\D/g,''));
    const verifimonto= await paginaCart.VerifyShop(precio!, cantidad!);
    expect(montototalentero).toBe(verifimonto);
  });
  // test('')
});
//testasdsadk