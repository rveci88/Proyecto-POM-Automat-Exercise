import { Page, Locator } from '@playwright/test';

export class HomePage{
    readonly pageHome: Page;
    readonly deleteLink:Locator;
    readonly productsLink:Locator;
    readonly logoutLink: Locator;
   
    constructor (page:Page){
        this.pageHome=page; 
        this.deleteLink=page.getByRole('link', { name: 'Delete account' })
        this.productsLink=page.getByRole('link', { name: 'Products' })
        this.logoutLink=page.getByRole('link', { name: 'Logout' })
    }

   async Deleteacount(){
        await this.deleteLink.click();
   }

    async navHomeURL(){
        await this.pageHome.goto('https://automationexercise.com');
    }

    async Logout(){
        await this.logoutLink.click();
   }
}