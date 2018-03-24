'use strict';

{
    const API = {
        endpoints: {
            laureate: 'http://api.nobelprize.org/v1/laureate.json?',
            prize: 'http://api.nobelprize.org/v1/prize.json?'
        },
        queries: [{
                description: 'Select a query',
                endpoint: ''
            },
            {
                description: 'All female laureates',
                endpoint: 'laureate',
                queryString: 'gender=female'
            },
            {
                description: 'All Dutch laureates',
                endpoint: 'laureate',
                queryString: 'bornCountryCode=NL'
            },
            {
                description: 'Physics prizes 1900-1925',
                endpoint: 'prize',
                queryString: 'year=1925&yearTo=25&category=physics'
            },
            {
                description: 'Nobel Prizes 2017',
                endpoint: 'prize',
                queryString: 'year=2017'
            },
            {
                description: 'Physicists working on quantum electrodynamics',
                endpoint: 'laureate',
                queryString: 'motivation=quantum electrodynamics'
            },
        ]
    };

    function fetchJson(url, cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    cb(null, xhr.response);

                } else {
                    cb(new Error(xhr.statusText));
                }
            }
        };

        xhr.send();
    }


    function renderSelect() {
        const root = document.getElementById('root');
        const select = createAndAppend('select', root);

        API.queries.forEach(query => {
            const option = createAndAppend('option', select);
            const url = API.endpoints[query.endpoint] + query.queryString;
            option.setAttribute('value', url);
            option.innerHTML = query.description;
        });

        select.addEventListener('change', event => {
            const url = event.target.value;
            console.log(url);
        });
    }
    renderSelect();


    function renderLaureates(laureates) {

        const root = document.getElementById('root');

        const listContainer = createAndAppend('div', root);
        listContainer.id = "list-container";


        laureates.forEach(laureate => {

            const listItem = createAndAppend('div', listContainer);
            listItem.id = 'list-item';
            const table = createAndAppend('table', listItem);
            const tbody = createAndAppend('tbody', table);
            const tr1 = createAndAppend('tr', tbody);
            const tr2 = createAndAppend('tr', tbody);
            const tr3 = createAndAppend('tr', tbody);
            const td1 = createAndAppend('td', tr1);
            const td2 = createAndAppend('td', tr1);
            const td3 = createAndAppend('td', tr3);
            td1.setAttribute('class', 'label');
            td1.innerHTML = 'Name:';
            td2.innerHTML = laureate.firstname + ' ' + laureate.surname;
            td3.innerHTML = 'Born: ' + laureate.born;

        });
    }

    function createAndAppend(tagName, parent) {
        const elem = document.createElement(tagName);
        parent.appendChild(elem);
        return elem;
    }


    const url = API.endpoints.laureate + API.queries[5].queryString;


    function callback(error, data) {
        if (error !== null) {
            console.error(error);
        } else {
            renderLaureates(data.laureates);
        }

    }

    fetchJson(url, callback);

}