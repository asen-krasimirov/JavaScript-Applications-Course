const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


const endpoints = {
    bookURL: '**/jsonstore/collections/books/',
};

let browser;
let context;
let page;

const host = 'http://localhost:3000';

const mock = {
    "id1": {
        "title": "Title 1",
        "author": "Author 1",
        "_id": "id1"
    }
};

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

describe('End-To-End Tests for Book Library App', function () {
    // this.timeout(60000);
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

        await context.route('**/*.{png, jpg, jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';

        }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Book Loading', () => {
        it('books are loaded properly', async () => {
            await page.goto(host);

            await page.route(endpoints.bookURL, response => response.fulfill(json(mock)));

            await page.waitForSelector('#loadBooks');
            await page.click('text="LOAD ALL BOOKS"')
            await page.waitForSelector('tbody tr');

            const [title, author] = await page.$eval('tbody tr', tr => {
                let title = tr.querySelector('td:nth-child(1)').textContent;
                let author = tr.querySelector('td:nth-child(2)').textContent;
                return [title, author];
            });

            expect(title).to.equals(mock['id1'].title);
            expect(author).to.equals(mock['id1'].author);
        });
    });

    describe('Book adding', () => {

        beforeEach(async () => {
            await page.goto(host);
            await page.waitForSelector('#createForm');
        });

        it('correct book adding', async () => {

            await page.fill('#createForm input[name="title"]', mock['id1'].title);
            await page.fill('#createForm input[name="author"]', mock['id1'].author);

            const [request] = await Promise.all([
                page.waitForRequest(endpoints.bookURL),
                page.click('#createForm button')
            ]);

            const requestData = JSON.parse(request.postData());

            expect(request.method()).to.equals('POST');
            expect(requestData.title).to.equals(mock['id1'].title);
            expect(requestData.author).to.equals(mock['id1'].author);
        });

        it('incorrect book adding', async () => {
            page.on('dialog', dialog => dialog.accept());
            await page.click('#createForm button');
        });
    });

    describe('Book editing', () => {

        it('correct book editing', async () => {


            let curEndpoint = endpoints.bookURL + 'id1';

            let newTitle = 'New Title 1';
            let newAuthor = 'New Author 1';

            await page.goto(host);
            await page.route(endpoints.bookURL, response => response.fulfill(json(mock)));
            await page.route(curEndpoint, response => response.fulfill(json(mock['id1'])));

            await page.click('text="LOAD ALL BOOKS"')
            await page.waitForSelector('td');
            await page.click('text="Edit"');
            await page.waitForSelector('#editForm');

            const [loadedTitle, loadedAuthor] = await page.$eval('#editForm', form => {
                let title = form.querySelector('#editForm input[name="title"]').value;
                let author = form.querySelector('#editForm input[name="author"]').value;
                return [title, author];
            });

            expect(loadedTitle).to.equals(mock['id1'].title);
            expect(loadedAuthor).to.equals(mock['id1'].author);


            await page.fill('#editForm input[name="title"]', newTitle);
            await page.fill('#editForm input[name="author"]', newAuthor);

            const [request] = await Promise.all([
                page.waitForRequest(curEndpoint),
                page.click('#editForm button')
            ]);

            const requestData = JSON.parse(request.postData());

            expect(request.method()).to.equals('PUT');
            expect(requestData.title).to.equals(newTitle);
            expect(requestData.author).to.equals(newAuthor);
        });
    });

    describe('Book deleting', () => {

        it('correct book deleting', async () => {
            let curEndpoint = endpoints.bookURL + 'id1';

            await page.goto(host);
            await page.route(endpoints.bookURL, response => response.fulfill(json(mock)));
            await page.route(curEndpoint, response => response.fulfill(json(mock['id1'])));

            await page.click('text="LOAD ALL BOOKS"')
            await page.waitForSelector('td');

            page.on('dialog', dialog => dialog.accept());

            const [request] = await Promise.all([
                page.waitForRequest(curEndpoint),
                page.click('button:text("Delete")')
            ]);
            
            expect(request.method()).to.equals('DELETE');
        });
    });

});