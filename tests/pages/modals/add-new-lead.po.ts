import { type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class AddNewLeadPage extends PageBase {
    private sourcesAvailable: (source: string) => Locator;
    private moveToChosenButton: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private emailInput: Locator;
    private branchAccountInput: Locator;
    private branchAccountDropdown: (branch: string) => Locator;
    private saAccountInput: Locator;
    private saAccountDropdown: (branch: string) => Locator;
    private accountNameInput: Locator;
    private saveButton: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.sourcesAvailable = (source: string): Locator =>
            page.locator(
                '[data-field-id="RecordInflowLeadSource_cField"] ul > li',
                {
                    hasText: `${source}`,
                }
            );
        this.moveToChosenButton = page.locator(
            '[data-field-id="RecordInflowLeadSource_cField"] [title="Move to Chosen"]'
        );
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.locator('input[name="Email"]');
        this.branchAccountInput = page.locator(
            '[data-field-id="RecordBranchAccount_cField"] input'
        );
        this.branchAccountDropdown = (branch: string): Locator =>
            this.page.locator(
                '[data-field-id="RecordBranchAccount_cField"] ul[aria-label="Recent Accounts"] > li',
                {
                    hasText: `${branch}`,
                }
            );
        this.saAccountInput = page.locator(
            '[data-field-id="RecordSAAccount_cField"] input'
        );
        this.saAccountDropdown = (sa: string): Locator =>
            this.page.locator(
                '[data-field-id="RecordSAAccount_cField"] ul[aria-label="Recent Accounts"] > li',
                {
                    hasText: `${sa}`,
                }
            );
        this.accountNameInput = page.locator('input[name="Company"]');
        this.saveButton = page.locator('button[name="SaveEdit"]');
    }

    async selectLeadSource(source: string) {
        await this.sourcesAvailable(source).click();
        await this.moveToChosenButton.click();
    }

    async setFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async setLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async setEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async setBranchAccount(branch: string) {
        await this.branchAccountInput.click();
        await this.branchAccountDropdown(branch).waitFor();
        await this.branchAccountDropdown(branch).click();
    }

    async setSAAccount(sa: string) {
        await this.saAccountInput.click();
        await this.saAccountDropdown(sa).waitFor();
        await this.saAccountDropdown(sa).click();
    }

    async setAccountName(accountName: string) {
        await this.accountNameInput.fill(accountName);
    }

    async clickSave() {
        await this.saveButton.click();
    }
}
