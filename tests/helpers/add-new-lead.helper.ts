import { type Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { LeadsTabPage } from '../pages/tabs/leads-tab.po';
import { IAccount } from '../models';
import { AddNewLeadPage } from '../pages/modals/add-new-lead.po';

export class AddNewLeadHelper extends HelperBase {
    public addNewLeadPage: AddNewLeadPage;
    public leadsTabPage: LeadsTabPage;

    constructor(readonly page: Page) {
        super(page);
        this.addNewLeadPage = new AddNewLeadPage(page);
        this.leadsTabPage = new LeadsTabPage(page);
    }

    async addNewLead(account: IAccount) {
        await this.leadsTabPage.clickCreateNewLead();
        await this.page.waitForURL('**/lightning/o/Lead/new**');

        await this.addNewLeadPage.selectLeadSource(account.leadSource);
        await this.addNewLeadPage.setFirstName(account.firstName);
        await this.addNewLeadPage.setLastName(account.lastName);
        await this.addNewLeadPage.setEmail(account.email);
        await this.addNewLeadPage.setBranchAccount(account.branchAccount);
        await this.addNewLeadPage.setSAAccount(account.saAccount);
        await this.addNewLeadPage.setAccountName(account.accountName);

        await this.addNewLeadPage.clickSave();
    }
}
