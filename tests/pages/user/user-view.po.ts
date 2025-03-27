import { type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class UserViewPage extends PageBase {
    private userDetailButton: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.userDetailButton = page.locator('a[title="User Detail"]').first();
    }

    async openUserDetail() {
        await this.userDetailButton.click();
    }
}
