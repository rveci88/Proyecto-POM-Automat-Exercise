import { Page, Locator } from '@playwright/test'
import { UserFactory, URLs } from '../Factory/Users'

export class CartPage{
    
    readonly pageCart:Page;
    readonly deletebutton:Locator;
    readonly checkout:Locator;
    readonly placeorderbutton:Locator;
    readonly nameCard:Locator;
    readonly cardNumber:Locator;
    readonly exnumber:Locator;
    readonly mesExp:Locator;
    readonly yearExp:Locator;
    readonly payButton:Locator;
    readonly continuebutton:Locator;
    readonly price:Locator;
    readonly quantity:Locator;
    readonly totalprice: Locator;
    readonly proceedbutton: Locator
    readonly registerbutton: Locator

    constructor(page:Page){
      this.pageCart=page;
      this.deletebutton=page.locator('.cart_quantity_delete');
      this.checkout=page.getByText('Proceed To Checkout');
      this.placeorderbutton=page.getByRole('link', { name: 'Place Order' })
      this.nameCard=page.locator('input[name="name_on_card"]')
      this.cardNumber=page.locator('input[name="card_number"]')
      this.exnumber=page.getByRole('textbox', { name: 'ex.' })
      this.mesExp=page.getByRole('textbox', { name: 'MM' })
      this.yearExp=page.getByRole('textbox', { name: 'YYYY' })
      this.payButton=page.getByRole('button', { name: 'Pay and Confirm Order' })
      this.continuebutton=page.getByRole('link', { name: 'Continue' })
      this.price=page.locator('tr',{hasText:'Men Tshirt'}).locator('td').nth(2);
      this.quantity=page.locator('tr',{hasText:'Men Tshirt'}).locator('td').nth(3);
      this.totalprice=page.locator('tr',{hasText:'Men Tshirt'}).locator('td').nth(4);
      this.proceedbutton=page.getByText('Proceed To Checkout')
      this.registerbutton=page.getByRole('link', { name: 'Register / Login' })
    }
 
    async Deletecart():Promise<void>{
          await this.deletebutton.click();
    }

    async FlujoPago():Promise<void>{
       await this.checkout.click();
       await this.placeorderbutton.click();
       await this.nameCard.fill('Rafael Veci');
       await this.cardNumber.fill('1234123412341234');
       await this.exnumber.fill('311');
       await this.mesExp.fill('08');
       await this.yearExp.fill('2029');
       await this.payButton.click();
       await this.continuebutton.click();
    }

    async VerifyShop():Promise<boolean>{
      const precio = parseInt(((await this.pageCart.locator('tr', { hasText: 'Men Tshirt' }).locator('td').nth(2).textContent()) || '').replace(/\D/g, ''))
      const cantidad = parseInt(((await this.pageCart.locator('tr', { hasText: 'Men Tshirt' }).locator('td').nth(3).textContent()) || '').replace(/\D/g, ''))
      const montototal = parseInt(((await this.pageCart.locator('tr', { hasText: 'Men Tshirt' }).locator('td').nth(4).textContent()) || '').replace(/\D/g, ''))
      if(precio*cantidad===montototal){
        return true
      }else{
        return false
      }
    }

    async VerifyCant(producto:string){
      const tabla=await this.pageCart.locator('tr',{hasText:producto}).locator('td').nth(3).textContent()
      if(tabla){
      const cantidad=parseInt(tabla)
      return cantidad
      }else{
        return 10000
      }
    }

    async navcartURL():Promise<void>{
      await this.pageCart.goto(URLs.carturl);
    }

    async proceedCheck():Promise<void>{
      await this.proceedbutton.click()
      await this.registerbutton.click()
    }
}