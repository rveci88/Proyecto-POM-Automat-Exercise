import { Page, Locator} from '@playwright/test'

export class Navigate{

    readonly homelink: Locator
    readonly productlink: Locator
    readonly cartlink: Locator
    readonly loginlink: Locator
    readonly testlink: Locator
    readonly apilink: Locator
    readonly videolink: Locator
    readonly contactuslink: Locator
    readonly deletelink:Locator
    readonly logoutLink: Locator;

    constructor(page:Page){
        this.homelink=page.getByRole('link', { name: ' Home' })
        this.productlink=page.getByRole('link', { name: ' Products' })
        this.cartlink=page.getByRole('link', { name: ' Cart' })
        this.loginlink=page.getByRole('link', { name: ' Signup / Login' })
        this.testlink=page.getByRole('link', { name: ' Test Cases' })
        this.apilink=page.getByRole('link', { name: ' API Testing' })
        this.videolink=page.getByRole('link', { name: ' Video Tutorials' })
        this.contactuslink=page.getByRole('link', { name: ' Contact us' })
        this.deletelink=page.getByRole('link', { name: ' Delete Account' })
        this.logoutLink=page.getByRole('link', { name: 'Logout' })
    }
    async NavHome():Promise<void>{
        await this.homelink.click()
    }
    async NavProduct():Promise<void>{
        await this.productlink.click()
    }
    async NavCart():Promise<void>{
        await this.cartlink.click()
    }
    async Navlogin():Promise<void>{
        await this.loginlink.click()
    }
    async NavTest():Promise<void>{
        await this.testlink.click()
    }
    async NavVideo():Promise<void>{
        await this.videolink.click()
    }
    async NavContacus():Promise<void>{
        await this.contactuslink.click()
    }
    async NavDeleteAcount():Promise<void>{
        await this.deletelink.click()
    }
    async NavLogout(){
        await this.logoutLink.click();
   }
}