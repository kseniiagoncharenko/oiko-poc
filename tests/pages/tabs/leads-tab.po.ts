import { type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class LeadsTabPage extends PageBase {
    private convertButton: Locator;
    private leadEntry: (accountName: string) => Locator;
    private newLeadButton: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.convertButton = page.locator('button[name="Convert"]');
        this.leadEntry = (accountName: string): Locator =>
            page.locator('table > [data-label="Account Name"] > span', {
                hasText: `${accountName}`,
            });
        this.newLeadButton = page.locator('a[title="New"]');
    }

    async clickCreateNewLead() {
        await this.newLeadButton.click();
    }

    async clickAccountNameInTable(accountName: string) {
        await this.leadEntry(accountName).click();
        await this.page.waitForURL('**/view');
    }

    async clickConvertLead() {
        await this.convertButton.click();
    }
}
