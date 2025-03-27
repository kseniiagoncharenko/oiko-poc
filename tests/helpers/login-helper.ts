import { type Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { LoginPage } from '../pages/login.po';
import { UserViewPage } from '../pages/user/user-view.po';
import { UserDetailsPage } from '../pages/user/user-details.po';
import { GlobalHeaderHelper } from './global-header-helper';

export class LoginHelper extends HelperBase {
    public globalHeaderHelper: GlobalHeaderHelper;
    public loginPage: LoginPage;
    public userDetailsPage: UserDetailsPage;
    public userViewPage: UserViewPage;

    constructor(readonly page: Page) {
        super(page);
        this.globalHeaderHelper = new GlobalHeaderHelper(page);
        this.loginPage = new LoginPage(page);
        this.userDetailsPage = new UserDetailsPage(page);
        this.userViewPage = new UserViewPage(page);
    }

    async login(username: string, password: string) {
        await this.loginPage.setUsername(username);
        await this.loginPage.setPassword(password);
        await this.loginPage.clickLogin();
    }

    async loginAs(username: string) {
        await this.globalHeaderHelper.searchForUser(username);
        await this.userViewPage.openUserDetail();
        await this.userDetailsPage.loginOnBehalfOf();

        await this.page.waitForSelector(
            '[data-message-id="loginAsSystemMessage"]'
        );
    }
}
