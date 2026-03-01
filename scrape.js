const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = "https://sanand0.github.io/tdsdata/js_table/?seed=";

  let grandTotal = 0;

  for (let seed = 57; seed <= 66; seed++) {
    const url = baseUrl + seed;

    await page.goto(url, { waitUntil: "networkidle" });

    // Get full visible text from page
    const bodyText = await page.locator("body").innerText();

    // Extract ONLY proper standalone integers
    const matches = bodyText.match(/\b\d+\b/g) || [];

    const numbers = matches.map(n => parseInt(n, 10));

    const seedSum = numbers.reduce((acc, num) => acc + num, 0);

    console.log(`Seed ${seed} sum: ${seedSum}`);

    grandTotal += seedSum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
