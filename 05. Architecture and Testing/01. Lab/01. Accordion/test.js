const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables
describe('E2E tests', function () {
  this.timeout(6000);

  before(async () => { browser = await chromium.launch(); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); });

  describe('Accordion App Tests', () => {

    it('Application loads properly', async () => {
      await page.goto('http://localhost:3000/');
      await page.screenshot({ path: `index.png` });
    });

    it('Titles load properly', async () => {
      await page.goto('http://localhost:3000/');
      
      /*
      let contentToInclude = [
        'Scalable Vector Graphics',
        'Open standard',
        'Unix',
        'ALGOL'
      ]
      */

      const titles = await page.$$eval('.accordion .head span', (spans) => {
        // spans.forEach((span, index) => expect(span).to.equals(contentToInclude[index]));
        return spans.map(span => span.textContent);
      });

      expect(titles).includes('Scalable Vector Graphics');
      expect(titles).includes('Open standard');
      expect(titles).includes('Unix');
      expect(titles).includes('ALGOL');

    });

    it('Clicking the "More" button shows more info', async () => {
      await page.goto('http://localhost:3000/');
      let expectedText = `Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.`;

      await page.click('text="More"');

      const paragraphContent = await page.textContent('section div p');
      const buttonContent = await page.textContent('button');

      expect(paragraphContent).to.equal(expectedText);
      expect(buttonContent).to.equal('Less');
    });

    it('Clicking the "Less" button hides the info', async () => {
      await page.goto('http://localhost:3000/');

      await page.click('text="More"');
      await page.click('text="Less"');

      page.$eval('section div', (div) => {
        expect(div.style.display).to.equals('none');
      });

      page.$eval('button', (button) => {
        expect(button.textContent).to.equals('More');
      });
    });

  });
});
