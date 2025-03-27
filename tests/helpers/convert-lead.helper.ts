import { type Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { ConvertLeadPage } from '../pages/modals/convert-lead.po';
import { LeadsTabPage } from '../pages/tabs/leads-tab.po';
import { AccountsTabPage } from '../pages/tabs/accounts-tab.po';

export class ConvertLeadHelper extends HelperBase {
    public accountsTabPage: AccountsTabPage;
    public convertLeadPage: ConvertLeadPage;
    public leadsTabPage: LeadsTabPage;

    constructor(readonly page: Page) {
        super(page);
        this.accountsTabPage = new AccountsTabPage(page);
        this.convertLeadPage = new ConvertLeadPage(page);
        this.leadsTabPage = new LeadsTabPage(page);
    }

    async convertLeadToAccount(accountName: string) {
        await this.leadsTabPage.clickConvertLead();

        await this.convertLeadPage.isConvertLeadWindowVisible();
        await this.convertLeadPage.clickConvert();

        await this.page.waitForLoadState();

        await this.convertLeadPage.isConfirmationMessageVisible();
        await this.convertLeadPage.clickConvertedItemLink(accountName);

        await this.page.waitForURL('**/lightning/r/Account/**');

        await this.accountsTabPage.isAccountNameVisible(accountName);
    }
}
