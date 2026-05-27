import { Page, Locator } from '@playwright/test';
import { UserFactory } from '../Factory/Users';

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
        const userData=UserFactory.createData()
        await this.Sex.check();
        await this.passwordinput.fill(password)
        await this.dayinput.selectOption(userData.birthDay)
        await this.monthinput.selectOption(userData.birthMonth);
        await this.yearinput.selectOption(userData.birthYear);
        await this.firstnameinput.fill(userData.firstName);
        await this.lastnameinput.fill(userData.lastName);
        await this.companyinput.fill(userData.company);
        await this.addresinput.fill(userData.address);
        await this.countryinput.selectOption('United States');
        await this.stateinput.fill(userData.state);
        await this.cityinpud.fill(userData.city);
        await this.zipcodeinput.fill(userData.zipCode);
        await this.phonenumberinput.fill(userData.phoneNumber);
        await this.createbutton.click();
        await this.pagereg.getByText('Continue').click();
    }

    async ejecutarRegistro():Promise<void>{
        await this.createbutton.click()
    }
        
}
    
