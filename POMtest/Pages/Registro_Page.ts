import { Page, Locator } from '@playwright/test';
import { userData } from '../Data/Users';

export class RegisterP{
    
    readonly pagereg: Page;
    readonly Sex: Locator;
    readonly passwordinput: Locator;
    readonly dayinput: Locator;
    readonly monthinput: Locator;
    readonly yearinput: Locator;
    readonly firstnameinput: Locator;
    readonly lastnameinput: Locator;
    readonly companyinput: Locator;
    readonly addresinput: Locator;
    readonly countryinput: Locator;
    readonly stateinput: Locator;
    readonly cityinpud: Locator;
    readonly zipcodeinput: Locator;
    readonly phonenumberinput: Locator;
    readonly createbutton:Locator;

    constructor(page:Page){
        this.pagereg=page;
        this.Sex=page.getByRole('radio', { name: 'Mr.' });
        this.passwordinput=page.locator("//input[@id='password']");
        this.dayinput=page.locator("//select[@id='days']");
        this.monthinput=page.locator("//select[@id='months']");
        this.yearinput=page.locator("//select[@id='years']");
        this.firstnameinput=page.locator("//input[@id='first_name']");
        this.lastnameinput=page.locator("//input[@id='last_name']");
        this.companyinput=page.locator("//input[@id='company']");
        this.addresinput=page.locator("//input[@id='address1']");
        this.countryinput=page.locator("//select[@id='country']");
        this.stateinput=page.locator("//input[@id='state']");
        this.cityinpud=page.locator("//input[@id='city']");
        this.zipcodeinput=page.locator("//input[@id='zipcode']");
        this.phonenumberinput=page.locator("//input[@id='mobile_number']");
        this.createbutton=page.locator("//button[@data-qa='create-account']");
    }

    async registro(password:string):Promise<void>{
        await this.Sex.check();
        await this.passwordinput.fill(password);
        await this.dayinput.selectOption(userData.dayinput);
        await this.monthinput.selectOption(userData.monthinput);
        await this.yearinput.selectOption(userData.yearinput);
        await this.firstnameinput.fill(userData.firstnameinput);
        await this.lastnameinput.fill(userData.lastnameinput);
        await this.companyinput.fill(userData.companyinput);
        await this.addresinput.fill(userData.addresinput);
        await this.countryinput.selectOption(userData.countryinput);
        await this.stateinput.fill(userData.stateinput);
        await this.cityinpud.fill(userData.cityinpud);
        await this.zipcodeinput.fill(userData.zipcodeinput);
        await this.phonenumberinput.fill(userData.phonenumberinput);
        await this.createbutton.click();
    }
        
}
    
