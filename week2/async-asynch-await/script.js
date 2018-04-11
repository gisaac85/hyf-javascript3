'use strict'; {
    window.onload = main;

    /**
     * Fetches JSON data asynchronously
     * @param {string} url The url to fetch
     */
    function fetchJSON(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json';
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error('Error: ' + xhr.status + ' ' + xhr.statusText));
                    }
                }
            };
            xhr.send();
        });
    }

    /**
     * Add DOM element with properties
     * @param {string} Name of DOM child
     * @param {string} parent Name of DOM parent
     * @param {object} options Attributes of DOM Child
     */
    function createAndAppend(name, parent, options = {}) {
        const elem = document.createElement(name);
        parent.appendChild(elem);
        Object.keys(options).forEach(key => {
            const value = options[key];
            if (key === 'html') {
                elem.innerHTML = value;
            } else {
                elem.setAttribute(key, value);
            }
        });
        return elem;
    }

    /**
     * sort <select> options alphabetically
     */
    function sortList(ele) {
        const clTexts = new Array();
        for (let i = 1; i < ele.length; i++) {
            clTexts[i - 1] =
                ele.options[i].text.toUpperCase() + "," +
                ele.options[i].text + "," +
                ele.options[i].value;
        }

        clTexts.sort();

        for (let i = 1; i < ele.length; i++) {
            const parts = clTexts[i - 1].split(',');

            ele.options[i].text = parts[1];
            ele.options[i].value = parts[2];
        }
    }

    /**
     * Main function 
     */
    async function main() {
        try {

            const root = document.getElementById('root');

            const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100?json';

            createAndAppend('h1', root, {
                html: 'HYF SPA'
            });

            const header = createAndAppend('div', root, {
                id: 'header'
            });

            createAndAppend('label', header, {
                html: 'Select a Repository:'

            });

            const container = createAndAppend('div', root, {
                class: 'container',
                id: 'container'
            });

            const informationDiv = createAndAppend('div', container, {
                class: 'infoDiv'
            });

            createAndAppend('ul', informationDiv, {
                id: 'info'
            });

            const imagesDiv = createAndAppend('div', container, {
                class: 'imgDiv'
            });

            createAndAppend('ul', imagesDiv, {
                id: 'imgUl'
            });

            const data = await fetchJSON(url);


            manipulateSelect(data);

        } catch (err) {
            document.getElementById('container').innerHTML = err.message;
        }
    }

    /**
     * Renders the <select> element
     * @param {object} DOM element 
     */
    function manipulateSelect(data) {

        const select = createAndAppend('select', document.getElementById('header'));

        createAndAppend('option', select, {

            html: 'Select Repo',

        });

        createAndAppend('optgroup', select, {
            label: '--------------------------------'
        });


        data.forEach(repo => {
            createAndAppend('option', select, {
                html: repo.name,
                value: repo.url
            });
        });

        sortList(select);

        select.addEventListener('change', function (event) {

            const index = select.selectedIndex;
            if (index > 0) {

                getRepoInformation(event.target.value);
                getContributorInformation(event.target.value);

            } else {
                const ulInfo = document.getElementById('info');
                ulInfo.innerHTML = '';
                const ulImg = document.getElementById('imgUl');
                ulImg.innerHTML = '';
            }

        });

    }

    /**
     * Return Information of Repo
     * @param {object} DOM element
     */
    async function getRepoInformation(data) {
        try {
            const ulInfo = document.getElementById('info');

            ulInfo.innerHTML = '';

            const repo = await fetchJSON(data);

            createAndAppend('li', ulInfo, {
                html: 'Name : ' + "<a href=" + repo.html_url + ' target="_blank" >' + repo.name + "</a>",

            });

            createAndAppend('li', ulInfo, {
                html: 'Description : ' + '<span>' + repo.description + '</span>'
            });

            createAndAppend('li', ulInfo, {
                html: 'Forks : ' + '<span>' + repo.forks + '</span>'
            });

            createAndAppend('li', ulInfo, {
                html: 'Updated : ' + '<span>' + repo.updated_at + '</span>'
            });

        } catch (err) {
            document.getElementById('container').innerHTML = err.message;
        }

    }

    /**
     * Return Information of Contributor
     * @param {object} DOM element 
     */
    async function getContributorInformation(url) {
        try {
            const ulImg = document.getElementById('imgUl');

            ulImg.innerHTML = '';

            const repo = await fetchJSON(url);

            const contrUrl = repo.contributors_url;

            const contributors = await fetchJSON(contrUrl);

            for (const contributor of contributors) {

                const el = createAndAppend('li', ulImg, {
                    class: 'element'
                });

                createAndAppend('img', el, {
                    src: contributor.avatar_url
                });

                createAndAppend('div', el, {
                    html: contributor.login,
                    id: 'contributorName'
                });

                createAndAppend('div', el, {
                    html: contributor.contributions,
                    id: 'contributionsCounter'
                });

            }

        } catch (err) {
            document.getElementById('container').innerHTML = err.message;
        }
    }
}