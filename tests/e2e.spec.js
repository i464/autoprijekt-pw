import { test, expect } from "@playwright/test";
import { locators } from "../pages/locators";
import MainPage from "../pages/main.page";

test("e2e with shop", async ({ page }) => {
	const mainPage = new MainPage(page);

	await page.goto(locators.mainUrl);
	await page.waitForLoadState("load");
	const titleText = await mainPage.getTitle();
	await expect(titleText).toBe("Shop");

	const amountText = await mainPage.getItemCount();
	await expect(amountText.trim()).toEqual("0 items");

	await page.click(locators.addToCartButton);
	await page.click(locators.goToCartButton);
	await page.waitForLoadState("load");
	const urlCard = page.url();
	expect(urlCard).toBe(locators.cartUrl);

	await page.click(locators.qtyInput);
	await page.fill(locators.qtyInput, "2");

	await page.click(locators.updateCartButton);
	await page.waitForLoadState("load");

	const button = await page.$(locators.updateCartButton);
	const isButtonDisabled = await button.evaluate((button) => button.disabled);

	if (!isButtonDisabled) {
		await page.waitForSelector(locators.spinnerOverlay, { state: "detached" });
	}

	const value = await page.$(locators.totalValue);
	const total = await value.textContent();
	expect(total.replace(/\u00A0/g, " ").trim()).toBe(
		"30,00 €".replace(/\u00A0/g, " ")
	);
});
