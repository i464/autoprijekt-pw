import { locators } from "./locators";

class MainPage {
	constructor(page) {
		this.page = page;
	}

	async getTitle() {
		const title = await this.page.$(locators.titleHeader);
		return title.textContent();
	}

	async getItemCount() {
		const itemCount = await this.page.$(locators.itemCount);
		return itemCount.textContent();
	}
}
export default MainPage;
