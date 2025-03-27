import { type Locator, type Page } from '@playwright/test';
import { PageBase } from './page-base.po';

export class LoginPage extends PageBase {
  protected usernameInput: Locator;
  protected passwordInput: Locator;
  protected loginButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#Login');
  }

  async setUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async setPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
