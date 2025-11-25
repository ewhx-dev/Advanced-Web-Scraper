# 🕸️ Advanced Web Scraper (Node.js)

A robust and modular web scraping solution built on Node.js, utilizing **Puppeteer** for modern, headless browser interaction and **Cheerio** for efficient DOM parsing. Data is automatically extracted into a **CSV** file.

## Features

* **Headless Browser:** Uses Puppeteer to handle dynamic content (AJAX, JavaScript rendering).
* **Efficient Parsing:** Leverages Cheerio for fast DOM manipulation post-load.
* **Modular Code:** Built as a reusable class (`AdvancedScraper`).
* **CSV Export:** Automatically saves results to `scraped_data.csv`.

## Getting Started

### Prerequisites

* **Node.js** (v14 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https:[github.com/ewhx-dev/Advanced-Web-Scraper.git](https://github.com/ewhx-dev/Advanced-Web-Scraper.git)
    cd Advanced-Web-Scraper
    ```
2.  **Install dependencies** (Puppeteer, Cheerio, csv-writer):
    ```bash
    npm install
    ```

### Configuration and Run

1.  **Customize `scraper.js`:**
    * Update the `TARGET_URL` constant with the URL of the website you wish to scrape.
    * **Crucially**, update the CSS selectors (e.g., `.product-item`, `.product-title`) within the `extractData()` method to match the HTML structure of your target website.
2.  **Run the script:**
    ```bash
    npm start 
    # OR
    node scraper.js
    ```
    The extracted data will be saved to a file named `scraped_data.csv` in the project root.

## License

This project is licensed under the ISC License. See the `package.json` for details.

> **⚠️ Legal Notice:** Always check the website's `robots.txt` file and their terms of service before scraping. Use this tool responsibly and ethically.
