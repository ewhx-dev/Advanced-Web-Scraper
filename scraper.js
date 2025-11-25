const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class AdvancedScraper {
    constructor(targetUrl) {
        this.targetUrl = targetUrl;
        this.browser = null;
        this.page = null;
        this.outputFile = 'scraped_data.csv';
        this.csvWriter = createCsvWriter({
            path: this.outputFile,
            header: [
                { id: 'title', title: 'Product Title' },
                { id: 'price', title: 'Price' },
                { id: 'availability', title: 'Availability' }
            ]
        });
    }

    async init() {
        try {
            console.log('🚀 Launching browser...');
            this.browser = await puppeteer.launch({
                headless: true, 
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            this.page = await this.browser.newPage();
            console.log('✅ Browser launched successfully.');
        } catch (error) {
            console.error('❌ Error initializing browser:', error.message);
            throw error;
        }
    }

    async navigate() {
        try {
            console.log(`🌐 Navigating to ${this.targetUrl}...`);
            await this.page.goto(this.targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
            await this.page.waitForSelector(a_specific_selector, { timeout: 30000 });
            console.log('✅ Page loaded.');
        } catch (error) {
            console.error('❌ Error navigating to URL:', error.message);
            throw error;
        }
    }

    async extractData() {
        console.log('🔍 Starting data extraction...');
        const htmlContent = await this.page.content();
        const $ = cheerio.load(htmlContent);
        const extractedData = [];
        const productSelector = '.product-item';

        $(productSelector).each((i, element) => {
            try {
                const title = $(element).find('.product-title a').text().trim();
                const price = $(element).find('.price-display').text().replace(/[^\d.,]/g, '').trim();
                const availability = $(element).find('.stock-status').text().trim();
                if (title && price) {
                    extractedData.push({
                        title,
                        price,
                        availability: availability || 'N/A'
                    });
                }
            } catch (error) {
                console.warn(`⚠️ Warning: Could not extract data from item ${i}. Error: ${error.message}`);
            }
        });

        console.log(`✅ Extraction complete. Found ${extractedData.length} items.`);
        return extractedData;
    }

    async saveToCsv(data) {
        if (data.length === 0) {
            console.log('💾 No data to save.');
            return;
        }
        console.log(`💾 Saving data to ${this.outputFile}...`);
        await this.csvWriter.writeRecords(data);
        console.log('✅ Data saved successfully!');
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('👋 Browser closed.');
        }
    }

    async run() {
        await this.init();
        try {
            await this.navigate();
            const data = await this.extractData();
            await this.saveToCsv(data);
        } catch (error) {
            console.error('🔥 CRITICAL ERROR during run:', error.message);
        } finally {
            await this.close();
        }
    }
}

const TARGET_URL = 'https://example.com/products';

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const scraper = new AdvancedScraper(TARGET_URL);
scraper.run();
