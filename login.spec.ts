import { test, expect } from '@playwright/test';
import { login } from './../service/login';
import config from './../config';

test.describe('User Authentication Flow', () => {
  test('Successful login', async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(config.CHAT_URL, { timeout: 20000 });
  });

  test('Failed login with incorrect password', async ({ page }) => {
    await page.goto(config.LOGIN_URL);
    await page.fill('input[name="email"]', config.EMAIL);
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.getByRole('button', { name: 'Continúe', exact: true }).click();
    await expect(page.locator('text=Credenciales inválidas')).toBeVisible({ timeout: 10000 });
  });

  test('Failed login with incorrect email', async ({ page }) => {
    await page.goto(config.LOGIN_URL);
    await page.fill('input[name="email"]', 'wronguser@mail.com');
    await page.fill('input[name="password"]', config.PASSWORD);
    await page.getByRole('button', { name: 'Continúe', exact: true }).click();
    await expect(page.locator('text=Credenciales inválidas')).toBeVisible({ timeout: 10000 });
  });
});