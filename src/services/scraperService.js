const { chromium } = require('@playwright/test');

class ScraperService {
    async initialize() {
        this.browser = await chromium.launch({
            headless: false
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async searchLeads(keyword = 'React Developer', maxResults = 10) {
        try {
            if (!this.browser) await this.initialize();

            await this.page.goto(`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(keyword)}`);
            await this.page.waitForSelector('.reusable-search__result-container');

            const leads = await this.page.evaluate((maxResults) => {
                const results = [];
                const elements = document.querySelectorAll('.reusable-search__result-container');

                for (let i = 0; i < Math.min(elements.length, maxResults); i++) {
                    const element = elements[i];
                    results.push({
                        name: element.querySelector('.entity-result__title-text')?.innerText?.trim() || '',
                        title: element.querySelector('.entity-result__primary-subtitle')?.innerText?.trim() || '',
                        location: element.querySelector('.entity-result__secondary-subtitle')?.innerText?.trim() || '',
                        profileUrl: element.querySelector('.app-aware-link')?.href || ''
                    });
                }
                return results;
            }, maxResults);

            return leads;
        } catch (error) {
            console.error('Error in lead scraping:', error);
            throw error;
        }
    }

    async close() {
        if (this.browser) {
            await this.context.close();
            await this.browser.close();
            this.browser = null;
            this.context = null;
            this.page = null;
        }
    }
}

module.exports = new ScraperService();