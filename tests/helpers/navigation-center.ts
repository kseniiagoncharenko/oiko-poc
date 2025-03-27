import { type Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { NavigationMenuPage } from '../pages/shared/navigation-center.po';

export class NavigationHelper extends HelperBase {
    public navigationCenterMenu: NavigationMenuPage;

    constructor(readonly page: Page) {
        super(page);
        this.navigationCenterMenu = new NavigationMenuPage(page);
    }

    async gotoHomeTab() {
        await this.navigationCenterMenu.goToHomeTab();
    }

    async gotoLeadsTab() {
        await this.navigationCenterMenu.goToLeadsTab();
        await this.page.waitForURL('**/lightning/o/Lead/list**');
    }
}
