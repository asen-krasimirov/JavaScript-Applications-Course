import { html, render } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
// import { page } from '../node_modules/page/page.js';
import page from "//unpkg.com/page/page.mjs";


const validator = (function createValidator() {
    
    function isAtLeastFourSymbols(string) {
        return string.length >= 4;
    }
    
    
    function isYearBetween(year) {
        return 1950 <= Number(year) && Number(year) <= 2050;
    }
    
    
    function isMoreThenTenSymbols(string) {
        return string.length > 10;
    }
    
    
    function isPricePositive(price) {
        return Number(price) >= 0;
    }
    
    
    function isPrecent(url) {
        return url;
    }
    
    return {
        isAtLeastFourSymbols,
        isYearBetween,
        isMoreThenTenSymbols,
        isPricePositive,
        isPrecent
    }
})()


function validateSubmitedData(body) {

    const nonValidCategories = [];
    if (!validator.isAtLeastFourSymbols(body.make) || !validator.isAtLeastFourSymbols(body.model)) {
        nonValidCategories.push('- Make and Model must be at least 4 symbols long.');
    }
    if (!validator.isYearBetween(body.year)) {
        nonValidCategories.push('- Year must be between 1950 and 2050.');
    }
    if (!validator.isMoreThenTenSymbols(body.description)) {
        nonValidCategories.push('- Description must be more than 10 symbols.');
    }
    if (!validator.isPricePositive(body.price)) {
        nonValidCategories.push('- Price must be a positive number.');
    }
    if (!validator.isPrecent(body.img)) {
        nonValidCategories.push('- Image URL is required.');
    }

    return nonValidCategories;
}


export {
    html,
    render,
    until,
    page,
    validator,
    validateSubmitedData,
}