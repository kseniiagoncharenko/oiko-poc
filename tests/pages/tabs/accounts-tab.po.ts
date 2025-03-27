import { type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class AccountsTabPage extends PageBase {
    private accountName: (accountName: string) => Locator;

    constructor(readonly page: Page) {
        super(page);
        this.accountName = (accountName: string): Locator =>
            page.locator('[data-field-id="RecordNameField"] span').filter({
                hasText: `${accountName}`,
            });
    }

    async isAccountNameVisible(accountName: string) {
        await this.accountName(accountName).waitFor();
    }
}
