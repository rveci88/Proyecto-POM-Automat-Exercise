import { test, expect } from '../Fixtures/Fixture';
import { userData } from '../Data/Users';

test.describe('Test de Login', ()=>{
  test('Login exitoso', async({page,loginPage,registerPage,homePage})=>{
    await loginPage.navURL()
    await loginPage.login(userData.emailtest, userData.password)
    await expect(page).toHaveURL(userData.homeurl)
    await homePage.Logout()
    await expect(page).toHaveURL(userData.loginurl)
  });
  test('Login con email incorrect', async ({page,loginPage})=>{
    await loginPage.navURL();
    await loginPage.login('wrongemail@gmail', userData.password);  //correo falta el .com
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con password incorrect', async ({page,loginPage})=>{
    await loginPage.navURL();
    await loginPage.login(userData.email, 'hjgsad62hf');  //password incorrecta
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
  test('Login con email vacio', async ({page, loginPage})=>{
    await loginPage.navURL();
    await loginPage.login('', userData.password);  //correo vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
  test('Login con password vacia', async ({page, loginPage})=>{
    await loginPage.navURL();
    await loginPage.login(userData.email, '');  //password vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
  test('Login con password y correo vacios', async ({page, loginPage})=>{
    await loginPage.navURL();
    await loginPage.login('', '');  //password y email vacio
    await expect(page).toHaveURL(userData.loginurl);
  });
});
test.describe('Test de Registro', ()=>{
  test('registro exitoso', async({page,loginPage,registerPage,homePage})=>{
    await loginPage.navURL();
    await loginPage.signup(userData.name, userData.email);
    await registerPage.registro(userData.password);
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
  });
  test('registro con email existente', async({page,loginPage})=>{
    await loginPage.navURL();
    await loginPage.signup(userData.name, userData.emailtest);
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
  test('registro con campos obligatorios vacios', async({page,loginPage})=>{
    await page.goto(userData.loginurl);
    await loginPage.signup(userData.name, userData.email);
    await expect(page).toHaveURL(userData.registrourl);
    await page.getByRole('button', {name:'Create Account'}).click();
    await expect(page).toHaveURL(userData.registrourl);
  });
  test('registro con campos password muy corta', async({page,loginPage,registerPage,homePage})=>{
    await page.goto(userData.loginurl);
    await loginPage.signup(userData.name, userData.email);
    await expect(page).toHaveURL(userData.registrourl);
    await registerPage.registro('Isi');
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
  });
});
test.describe('Test Flujos de compra', ()=>{
  test('Verificar busqueda de producto', async({page, productPage})=>{
     await productPage.navproductURL()
     await productPage.Searchproduct(userData.producto)
     await expect(page.getByText(userData.producto).nth(2)).toBeVisible()
  }); 
  test('Agregar producto al carrito y eliminarlo', async({page, productPage, cartPage})=>{
    await productPage.navproductURL();
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await expect(page.locator('tr',{hasText:'Men Tshirt'})).toBeVisible();
    await cartPage.Deletecart();
    await expect(page.getByText('Cart is empty!',{exact:true})).toBeVisible();
  });
  test('Verificar cantidad comprada en el carrito', async({page, productPage, cartPage})=>{
    await productPage.navproductURL();
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await expect(page.locator('tr',{hasText:'Men Tshirt'}).locator('td').nth(3)).toContainText('5');
    await cartPage.Deletecart();
  });
  test('Flujo de compra y pago', async({page, loginPage, registerPage, homePage, productPage, cartPage})=>{
    await loginPage.navURL();
    await loginPage.signup(userData.name, userData.email);
    await registerPage.registro(userData.password);
    await expect(page).toHaveURL(userData.homeurl);
    await productPage.navproductURL();
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await cartPage.FlujoPago();
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
  });
  test('realizar pedido y loguearse despues',async({page, productPage, cartPage, loginPage, registerPage, homePage})=>{
    await page.goto(userData.producturl);
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await page.getByText('Proceed to Checkout').click();
    await page.getByRole('link', {name:'Register / Login'}).click();
    await loginPage.signup(userData.name, userData.email);
    await registerPage.registro(userData.password);
    await cartPage.navcartURL()
    await cartPage.FlujoPago();
    await expect(page).toHaveURL(userData.homeurl);
    await homePage.Deleteacount();
  });
  test('Eliminar 1 producto del carrito', async({page, productPage, cartPage})=>{
    await page.goto(userData.producturl);
    await productPage.Searchproduct(userData.producto);
    await productPage.AddCarrito(userData.cantidadproducto);
    await cartPage.Deletecart();
    await expect(page.getByText('Cart is empty!',{exact:true})).toBeVisible();
  });
  test('Verificar monto de la compra', async({productPage, cartPage})=>{
    await productPage.navproductURL()
    await productPage.Searchproduct(userData.producto)
    await productPage.AddCarrito(userData.cantidadproducto);
    expect(await cartPage.VerifyShop()).toBe(true)
  });
  test('Agregar al carrito desde marca', async({page, productPage, cartPage})=>{
    await productPage.navproductURL()
    await page.getByRole('link', { name: '(6) Polo' }).click();
    await expect(page.getByText('Brand - Polo Products')).toBeVisible();
    await productPage.AddCarrito('5')
    await expect(page).toHaveURL(userData.carturl);
  });
  test('Verificar carrito luego de loguearse', async ({page,homePage, registerPage,loginPage, productPage, cartPage})=>{
    await productPage.navproductURL()
    await productPage.Searchproduct(userData.producto)
    await productPage.AddCarrito('10')
    await loginPage.navURL()
    await loginPage.signup(userData.name, userData.email)
    await registerPage.registro(userData.password)
    await cartPage.navcartURL()
    expect(await cartPage.VerifyCant(userData.producto)).toBe(10)
    await homePage.navHomeURL()
    await homePage.Deleteacount()
    await expect(page.getByText('Account Deleted!')).toBeVisible()
  })
}); 
test.describe('API testing', ()=>{
  test('Get all product list', async ({request})=>{
      const response=await request.get('https://automationexercise.com/api/productsList')
      expect(response.status()).toBe(200)
      const body=await response.json()
      console.log(body)
  })
  test('POST To All Products List', async ({request})=>{
      const response= await request.post('https://automationexercise.com/api/productsList', {
        data:{
          id:30,
          name: 'Red short',
          price: 'Rs. 300',
          brand: 'Polo',
          category: {
            usertype:{
              usertype:'Woman'
            },
            category:'Tops'
          }
        }
      })
      const body=await response.json()
      expect(body.responseCode).toBe(405)
      console.log('La api responde status code 200 y el body dice que es status code 405 Method not allowed')
      console.log(body)
    })
  test('Get All Brands List', async ({request})=>{
    const response=await request.get('https://automationexercise.com/api/brandsList')
    const body=await response.json()
    expect(response.status()).toBe(200)
    console.log('la respuesta del servisor es statuscode '+ response.status())
    console.log(body)
  })  
  test('POST To Search Product', async ({request})=>{
    const response=await request.post('https://automationexercise.com/api/searchProduct',{form:{
      search_product:'Men Tshirt'
    }})
    const body=await response.json()
    expect(response.status()).toBe(200)
    console.log('La respuesta del server es: '+response.status())
    console.log(body)
  })
  test('POST To Search Product without search_product parameter', async ({request})=>{
    const response=await request.post('https://automationexercise.com/api/searchProduct',{form:{}})
    const body=await response.json()
    expect(body.responseCode).toBe(400)
    console.log('La respuesta del server es: '+response.status()+' pero la respuesta del body es: '+body.responseCode)
    console.log(body)
  })
  test('POST To Verify Login with valid details', async({request})=>{
    const response=await request.post('https://automationexercise.com/api/verifyLogin', {form:{
    email:'rveci@gmail.com',
    password: userData.password
  }})
  const body=await response.json()
  expect(response.status()).toBe(200)
  console.log(body)
 })
})