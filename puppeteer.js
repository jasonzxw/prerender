/*
 * @author: jason_zuo
 * @LastEditors: jason_zuo
 * @LastEditTime: 2023-08-30 11:32:09
 * @FilePath: \prerender\puppeteer.js
 */
const puppeteer = require("puppeteer"),
  path = require("path"),
  config = require("./config"),
  fs = require("fs");

let prerender = async () => {
  console.log(`launch brower`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--lang=en-US"],
  });
  console.log(`go to page`);
  const page = await browser.newPage();
  
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.setJavaScriptEnabled(true)
  await page.goto("http://localhost:3000/");

  // Get the "viewport" of the page, as reported by the page.
  let html = await page.evaluate(() => document.documentElement.outerHTML);
  console.log("html:", html);
  html = html.replace(/<script (.+)><\/script>/gi, "");
  console.log("html:", html);
  const filePath = path.join(__dirname, config.ouputdir, "_index.html");
  console.log(filePath);
  fs.writeFileSync(filePath, html);
  await browser.close();
};
module.exports = {
  prerender,
};
