import { getYearFromYearSelector } from './yearSelector.js'
import { displayMonth } from './monthSelector.js'


const yearSelector = document.getElementById('years');
const monthSelectors = document.querySelectorAll('.monthCalendar');
const dayCalendars = document.querySelectorAll('.daysCalendar');

document.body.innerHTML = '';

getYearFromYearSelector(yearSelector, Array.from(monthSelectors), Array.from(dayCalendars));