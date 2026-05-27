import { Page, Locator } from '@playwright/test';
import { UserFactory, URLs } from '../Factory/Users';

export class LoginPage{
    readonly page: Page;
    readonly emailinput: Locator;
    readonly passwordinput: Locator;
    readonly loginbutton: Locator;
    readonly nameinput: Locator;
    readonly emailinputsingup: Locator;
    readonly signupbutton: Locator;

    constructor (page:Page){
        this.page=page;
        this.emailinput=page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordinput=page.locator("//input[@name='password']");
        this.loginbutton=page.locator("//*[@data-qa='login-button']"); 
        this.nameinput=page.locator("//input[@data-qa='signup-name']"); 
        this.emailinputsingup=page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.signupbutton=page.locator("//*[@data-qa='signup-button']"); 
    }

    async login(email:string, password:string):Promise<void>{
        await this.emailinput.fill(email);
        await this.passwordinput.fill(password);
        await this.loginbutton.click();
    }

    async signup(name: string, email: string): Promise<void>{
        await this.nameinput.fill(name);
        await this.emailinputsingup.fill(email);
        await this.signupbutton.click();
    }

    async navURL():Promise<void>{
        await this.page.goto(URLs.loginurl);
    }

}