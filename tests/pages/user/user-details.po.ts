import { FrameLocator, type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class UserDetailsPage extends PageBase {
    private iframe: FrameLocator;
    private loginAsButton: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.iframe = page.frameLocator('iframe');
        this.loginAsButton = this.iframe.locator(
            '#topButtonRow > input[title="Login"]'
        );
    }

    async loginOnBehalfOf() {
        await this.loginAsButton.waitFor();
        await this.loginAsButton.click();
        await this.page.waitForURL('**/lightning/page/home');
    }
}
