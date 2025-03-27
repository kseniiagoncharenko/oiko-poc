import { test } from '@playwright/test';
import { LoginHelper } from '../helpers/login-helper';
import { NavigationHelper } from '../helpers/navigation-center';
import { AddNewLeadHelper } from '../helpers/add-new-lead.helper';
import { ConvertLeadHelper } from '../helpers/convert-lead.helper';
import { Accounts, LeadSources } from '../constants';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const loginhelper = new LoginHelper(page);
    await loginhelper.login(
        process.env.SALESFORCE_USERNAME!,
        process.env.SALESFORCE_PASSWORD!
    );

    await loginhelper.loginAs('Testing Inflow');
});

test.afterEach(async ({ page }) => {
    page.close();
});

const accounts = [
    {
        firstName: 'e2euser',
        lastName: 'test',
        email: 'e2euser@test.com',
        branchAccount: 'Oikocredit Deutschland, Büro Berlin',
        saAccount: 'Oikocredit Ostdeutscher Förderkreis e. V.',
        accountName: 'E2E Company' + new Date().getTime(),
        leadSource: LeadSources.event,
    },
    {
        firstName: 'e2euser',
        lastName: 'test',
        email: 'e2euser@test.com',
        branchAccount: 'Oikocredit Deutschland, Büro Bonn',
        saAccount: 'Oikocredit Westdeutscher Förderkreis',
        accountName: 'E2E Company' + new Date().getTime(),
        leadSource: LeadSources.event,
    },
];
accounts.forEach((account) => {
    test(`convert lead from branch "${account.branchAccount}" to a contact`, async ({
        page,
    }) => {
        const newLead = Accounts.createAccount(
            account.firstName,
            account.lastName,
            account.email,
            account.branchAccount,
            account.saAccount,
            account.accountName,
            account.leadSource
        );

        const navigationHelper = new NavigationHelper(page);
        await navigationHelper.gotoLeadsTab();

        const addNewLeadHelper = new AddNewLeadHelper(page);
        await addNewLeadHelper.addNewLead(newLead);

        const convertLeadHelper = new ConvertLeadHelper(page);
        await convertLeadHelper.convertLeadToAccount(newLead.accountName);
    });
});
