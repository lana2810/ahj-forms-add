import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(100000);
describe("test form", () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = "http://localhost:8888";
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 500,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  test("test click on button add new", async () => {
    await page.goto(baseUrl);
    const btn = await page.$(".add");
    await btn.click();
    const inputName = await page.$("#name");
    await inputName.type("Новое название");
    const inputPrice = await page.$("#price");
    await inputPrice.type("Введен текст - ошибка!");
    const btnConfirm = await page.$(".confirm");
    await btnConfirm.click();
    await page.waitForSelector("span.tooltip");
  });
});
