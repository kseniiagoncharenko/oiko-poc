import { type Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { GlobalHeaderPage } from '../pages/shared/global-header.po';

export class GlobalHeaderHelper extends HelperBase {
    public globalHeaderPage: GlobalHeaderPage;

    constructor(readonly page: Page) {
        super(page);
        this.globalHeaderPage = new GlobalHeaderPage(page);
    }

    async searchForUser(userName: string) {
        await this.globalHeaderPage.clickSearchButton();
        await this.globalHeaderPage.openFilter();

        await this.globalHeaderPage.clickSearchResultItem('People');

        await this.globalHeaderPage.goToSearchResultDetails(userName);
    }
}
