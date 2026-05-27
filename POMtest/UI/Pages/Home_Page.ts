import { Page, Locator } from '@playwright/test';

export class HomePage{
    readonly pageHome: Page;
    readonly deleteLink:Locator;
    readonly productsLink:Locator;
   
    constructor (page:Page){
        this.pageHome=page; 
        this.deleteLink=page.getByRole('link', { name: 'Delete account' })
        this.productsLink=page.getByRole('link', { name: 'Products' })
    }

    async navHomeURL(){
        await this.pageHome.goto('https://automationexercise.com');
    }
}