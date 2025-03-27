import { type Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { UserViewPage } from '../pages/user/user-view.po';

export class UserViewHelper extends HelperBase {
    public userViewPage: UserViewPage;

    constructor(readonly page: Page) {
        super(page);
        this.userViewPage = new UserViewPage(page);
    }

    async openUserDetails() {
        await this.userViewPage.openUserDetail();
    }
}
