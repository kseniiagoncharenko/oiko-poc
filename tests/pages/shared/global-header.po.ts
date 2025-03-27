import { type Locator, type Page } from '@playwright/test';
import { PageBase } from '../page-base.po';

export class GlobalHeaderPage extends PageBase {
    private filterDropdown: Locator;
    private selectOption: (item: string) => Locator;
    private searchButton: Locator;
    private searchInput: Locator;
    private searchDialog: Locator;
    private searchResultItem: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.filterDropdown = page.locator('[data-value="Search: All"]');
        this.selectOption = (item: string): Locator =>
            page.locator('ul[aria-label="Suggested For You"] > li', {
                hasText: `${item}`,
            });
        this.searchButton = page.locator('.search-button');
        this.searchInput = page.getByPlaceholder('Search...');
        this.searchDialog = page.locator('.forceSearchAssistantDialog');
        this.searchResultItem = this.searchDialog.locator(
            'search_dialog-instant-result-item'
        );
    }

    async clickSearchButton() {
        await this.searchButton.waitFor();
        await this.searchButton.click();
    }

    async openFilter() {
        await this.filterDropdown.waitFor();
        await this.filterDropdown.click();
    }

    async clickSearchResultItem(item: string) {
        await this.selectOption(item).waitFor();
        await this.selectOption(item).click();
    }

    async goToSearchResultDetails(userName: string) {
        await this.searchInput.fill(userName);
        const userEntry = this.searchResultItem.filter({
            hasText: `${userName}User`,
        });
        await userEntry.waitFor();
        await userEntry.click();
    }
}
