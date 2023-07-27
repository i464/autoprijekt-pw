import { test, expect } from "@playwright/test";
import { locators } from "../pages/locators";
import MainPage from "../pages/main.page";

test("E2E Szenario für E-Commerce Demo-Shop", async ({ page }) => {
	// 1.Demo Shop unter folgender URL öffnen: https://autoprojekt.simplytest.de/
	const mainPage = new MainPage(page);
	await page.goto(locators.mainUrl);
	// Warten bis die Seite wird geladen
	await page.waitForLoadState("load");

	// 2.Überprüfen, ob die Überschrift sichtbar ist und "Shop" lautet
	const titleText = await mainPage.getTitle();
	await expect(titleText).toBe("Shop");

	// 3.Überprüfen, ob Warenkorb leer ist
	const amountText = await mainPage.getItemCount();
	await expect(amountText.trim()).toEqual("0 items");

	// 4.Artikel "Album" in Warenkorb durch Klick auf die Taste "Add to cart" legen
	await page.click(locators.addToCartButton);

	// 5.Zum Warenkorb durch Klick auf die "View cart" Taste wechseln
	await page.click(locators.goToCartButton);
	// Warten bis die Seite wird geladen
	await page.waitForLoadState("load");
	// Prüfen ob URL gleich dem erwarteten URL ist
	const urlCard = page.url();
	expect(urlCard).toBe(locators.cartUrl);

	// 6.Die Anzahl des Artikels auf 2 erhöhen
	await page.click(locators.qtyInput);
	await page.fill(locators.qtyInput, "2");
	// 7.Auf "Update cart" klicken und warten, bis die Änderungen angewendet werden
	await page.click(locators.updateCartButton);
	await page.waitForLoadState("load");
	// Prüfen, ob der Update cart Button nicht aktiv ist
	const button = await page.$(locators.updateCartButton);
	const isButtonDisabled = await button.evaluate((button) => button.disabled);
	// Wenn der Button aktiv ist, dann warten, bis der Spinner verschwindet
	if (!isButtonDisabled) {
		await page.waitForSelector(locators.spinnerOverlay, { state: "detached" });
	}
	// 8.Den veränderten Gesamtpreis überprüfen (30,00 €)
	const value = await page.$(locators.totalValue);
	const total = await value.textContent();
	expect(total.replace(/\u00A0/g, " ").trim()).toBe(
		"30,00 €".replace(/\u00A0/g, " ")
	);
});
