import { Page, Locator } from '@playwright/test'
import { userData } from '../Data/Users'

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
      this.price=page.locator('tr',{hasText:userData.producto}).locator('td').nth(2);
      this.quantity=page.locator('tr',{hasText:userData.producto}).locator('td').nth(3);
      this.totalprice=page.locator('tr',{hasText:userData.producto}).locator('td').nth(4);
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

    async VerifyShop(precio: string , cantidad: string):Promise<number>{
      const precioInt=parseInt(precio.replace(/\D/g,''));
      const cantidadInt=parseInt(cantidad);
      return precioInt*cantidadInt;
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
}