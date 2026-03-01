const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const base = "https://sanand0.github.io/tdsdata/js_table/?seed=";

  let grandTotal = 0;

  for (let seed = 57; seed <= 66; seed++) {
    const url = base + seed;
    await page.goto(url);

    // Get full visible page text
    const content = await page.textContent("body");

    // Extract all numbers using regex
    const numbers = content.match(/\d+/g).map(Number);

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;

    console.log(`Seed ${seed} sum:`, sum);
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
