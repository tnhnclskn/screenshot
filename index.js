const puppeteer = require("puppeteer");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const pageUrl = req.body.url;
  const elementQuery = req.body.element;
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(pageUrl);
  const element = await page.$(elementQuery);
  const image = await element.screenshot({
    type: "png",
  });

  browser.close();
  res.set("Content-Type", "image/png");
  res.send(image);
});

app.get("/up", async (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
