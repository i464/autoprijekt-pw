export const locators = {
	mainUrl: "https://autoprojekt.simplytest.de/",
	cartUrl: "https://autoprojekt.simplytest.de/cart/",
	titleHeader: "h1.woocommerce-products-header__title.page-title",
	itemCount: "span.count",
	addToCartButton: '//*[@id="main"]/ul/li[1]/a[2]',
	goToCartButton: '//*[@id="main"]/ul/li[1]/a[3]',
	qtyInput: 'input[title="Qty"]',
	updateCartButton:
		'button.button.wp-element-button[name="update_cart"][value="Update cart"]',
	totalValue:
		'td[data-title="Total"] strong span.woocommerce-Price-amount.amount bdi',
	spinnerOverlay: ".blockUI.blockOverlay",
};
