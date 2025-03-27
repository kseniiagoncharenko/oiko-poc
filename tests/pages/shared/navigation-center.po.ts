import { type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class NavigationMenuPage extends PageBase {
    private homeTab: Locator;
    private leadsTab: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.homeTab = page.locator('a[title="Home"]');
        this.leadsTab = page.locator('a[title="Leads"]');
    }

    async goToHomeTab() {
        await this.homeTab.click();
    }

    async goToLeadsTab() {
        await this.leadsTab.click();
    }
}
