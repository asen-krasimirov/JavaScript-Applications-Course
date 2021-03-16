const { chromium } = require('playwright-chromium');
const { expect } = require('chai');



let browser;
let context;
let page;

const host = 'http://localhost:3000';


function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}


describe('End-To-End Tests for Messenger App', function () {
    this.timeout(6000);

    before(async () => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Loading messages', () => {
        it('loads messages properly', async () => {
            const mock = {
                'record 1': { author: 'Author 1', content: 'Content 1' },
                'record 2': { author: 'Author 2', content: 'Content 2' }
            };

            await page.route('**/jsonstore/messenger*', response => response.fulfill(json(mock)));

            await page.goto(host);
            await page.waitForSelector('#messages');
            await page.click('#refresh');

            const content = await page.$eval('#messages', textarea => textarea.value);
            
            const expectedContent = ['Author 1: Content 1', 'Author 2: Content 2'].join('\n');
            expect(content).to.equals(expectedContent);
        });
    });

    describe('Sending messages', () => {
        it('sends messages properly', async () => {
            const endpoint = '**/jsonstore/messenger*';
            const mock = {
                author: 'TestAuthor',
                content: 'TestContent'
            }

            await page.route(endpoint, response => response.fulfill(json(mock)));

            await page.goto(host);
            await page.waitForSelector('#messages');

            await page.fill('[id="author"]', mock.author);
            await page.fill('[id="content"]', mock.content);

            const [response] = await Promise.all([
                page.waitForResponse(endpoint),
                page.click('[id="submit"]')
            ]);

            const responseData = JSON.parse(response.request().postData());
            expect(responseData.author).to.equals(mock.author);
            expect(responseData.content).to.equals(mock.content);

        });
    });
});