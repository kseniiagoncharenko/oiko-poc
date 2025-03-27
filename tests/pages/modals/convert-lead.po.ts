import { type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class ConvertLeadPage extends PageBase {
    private confirmationMessage: Locator;
    private convertedItemLink: (accountName: string) => Locator;
    private convertLeadWindowHeader: Locator;
    private convertButton: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.confirmationMessage = page.locator(
            '.runtime_sales_leadConvertedConfirmationDesktop'
        );
        this.convertedItemLink = (accountName: string): Locator =>
            page.locator(`.bodyConvertedItem a[title="${accountName}"]`);
        this.convertLeadWindowHeader = page.locator('h1', {
            hasText: 'Convert Lead ',
        });
        this.convertButton = page.locator(
            '.runtime_sales_leadConvertModalFooter button',
            {
                hasText: 'Convert',
            }
        );
    }

    async isConvertLeadWindowVisible() {
        await this.convertLeadWindowHeader.waitFor({
            timeout: 5000,
        });
    }

    async isConfirmationMessageVisible() {
        await this.confirmationMessage.waitFor({
            timeout: 5000,
        });
    }

    async clickConvert() {
        await this.convertButton.click();
    }

    async clickConvertedItemLink(accountName: string) {
        await this.convertedItemLink(accountName).click();
    }
}
