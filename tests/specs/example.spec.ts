import { test } from '@playwright/test';
import { LoginHelper } from '../helpers/login-helper';
import { NavigationHelper } from '../helpers/navigation-center';
import { AddNewLeadHelper } from '../helpers/add-new-lead.helper';
import { ConvertLeadHelper } from '../helpers/convert-lead.helper';
import { Accounts } from '../constants';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const loginhelper = new LoginHelper(page);
    await loginhelper.login('', '');

    await loginhelper.loginAs('Testing Inflow');
});

test.afterEach(async ({ page }) => {
    page.close();
});

test.describe('New Todo', () => {
    test('convert lead to a contact', async ({ page }) => {
        const newLead = Accounts.createGermanAccountWithEventSource();
        const navigationHelper = new NavigationHelper(page);
        await navigationHelper.gotoLeadsTab();

        const addNewLeadHelper = new AddNewLeadHelper(page);
        await addNewLeadHelper.addNewLead(newLead);

        const convertLeadHelper = new ConvertLeadHelper(page);
        await convertLeadHelper.convertLeadToAccount(newLead.accountName);
    });
});
