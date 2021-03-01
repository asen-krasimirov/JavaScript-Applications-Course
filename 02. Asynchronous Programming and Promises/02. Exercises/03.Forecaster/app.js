function attachEvents() {
    
    const symbolConvertor = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }
    
    const locationInput = document.getElementById('location');
    const informationDiv = document.getElementById('forecast');

    const todayConditionHolder = informationDiv.querySelector('#current');
    const upcomingConditionHolder = informationDiv.querySelector('#upcoming');

    document.getElementById('submit').addEventListener('click', displayTemperature);

    async function displayTemperature() {
        try {

            let locationCode = await getLocationCode();

            let currentUrl = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
            let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;

            const [currentConditions, upcomingConditions] = await Promise.all([
                fetch(currentUrl),
                fetch(upcomingUrl)
            ]);

            if (!currentConditions.ok || !upcomingConditions.ok) {
                throw new Error(`Error occured!`);
            }

            informationDiv.style.display = 'block';

            // adding the information for today
            const curData = await currentConditions.json();
            let [name, highTemp, lowTemp, condition] = [curData.name, curData.forecast.high, curData.forecast.low, curData.forecast.condition];
            createMainWeatherInformationElem(lowTemp, highTemp, condition, name);

            // adding the upcoming inforamtion
            const upcomingData = await upcomingConditions.json();
            createUpcomingWeatherInformaitonElems(upcomingData.forecast);

        } catch (error) {
            informationDiv.textContent = 'Error';
        }
    }

    async function getLocationCode() {
        let url = `http://localhost:3030/jsonstore/forecaster/locations`;
        const response = await fetch(url);
        const data = await response.json();

        for (const elem of data) {
            if (elem.name == locationInput.value) {
                return elem.code;
            }
        }
    }

    function createMainWeatherInformationElem(lowTemp, highTemp, weatherCondition, locationName) {
        // using innerHTML for some elements for escaping special characters

        const currentInfoHolderElem = e('div', [['className', 'forecasts']],
            e('span', [['className', 'condition symbol'], ['innerHTML', symbolConvertor[weatherCondition]]]),
            e('span', [['className', 'condition']],
                e('span', [['className', 'forecast-data'], ['textContent', locationName]]),
                e('span', [['className', 'forecast-data'], ['innerHTML', `${lowTemp}&#176;/${highTemp}&#176;`]]),
                e('span', [['className', 'forecast-data'], ['textContent', weatherCondition]])
            )
        )

        todayConditionHolder.appendChild(currentInfoHolderElem);
    }

    function createUpcomingWeatherInformaitonElems(forecastArray) {
        // using innerHTML for some elements for escaping special characters

        const currentInfoHolderElem = e('div', [['className', 'forecasts-info']]);
        
        for (const curInformation of forecastArray) {
            let [condition, highTemp, lowTemp] = [curInformation.condition, curInformation.high, curInformation.low];
            const curElem = e('span', [['className', 'upcoming']],
                e('span', [['className', 'symbol'], ['innerHTML', symbolConvertor[condition]]]),
                e('span', [['className', 'forecast-data'], ['innerHTML', `${lowTemp}&#176;/${highTemp}&#176;`]]),
                e('span', [['className', 'forecast-data'], ['textContent', condition]])
            );

            currentInfoHolderElem.appendChild(curElem);
        }        

        upcomingConditionHolder.appendChild(currentInfoHolderElem);
    }
}

attachEvents();

function e(type, attributes, ...children) {

    // function for creating custom DOM elements

    const newElem = document.createElement(type);

    for (let [name, value] of attributes) {
        newElem[name] = value;
    }

    for (const elem of children) {
        newElem.appendChild(elem);
    }

    return newElem;
}
