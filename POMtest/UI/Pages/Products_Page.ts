import { Page, Locator} from '@playwright/test'
import { UserFactory, URLs } from '../Factory/Users';

  export class ProductPage{
   
    readonly page:Page;
    readonly searchinput:Locator;
    readonly searchbutton:Locator;
    readonly viewProductv:Locator;
    readonly cantidad:Locator;
    readonly addtocart:Locator;
    readonly marca: Locator;

    constructor(page:Page){
        this.page=page;
        this.searchinput=page.getByRole('textbox', { name: 'Search Product' });
        this.searchbutton=page.locator('#submit_search');
        this.viewProductv=page.getByRole('link', { name: 'View Product' });
        this.cantidad=page.locator('#quantity');
        this.addtocart=page.getByRole('button', { name: 'Add to cart' });
        this.marca=page.getByRole('link', { name: '(6) Polo' });
    }

    async Searchproduct(producto:string):Promise<void>{
        await this.searchinput.fill(producto);
        await this.searchbutton.click();
    }

    async AddCarrito(cantidad:string):Promise<void>{
         await this.viewProductv.first().click();
         await this.cantidad.fill(cantidad);
         await this.addtocart.click();
         await this.page.getByRole('link',{name:'View Cart'}).click();
    }

    async navproductURL():Promise<void>{
        await this.page.goto(URLs.producturl);
    }

 }
  