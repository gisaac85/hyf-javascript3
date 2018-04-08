'use strict'; {

    window.onload = main;

    /**
     * Fetches JSON data asynchronously
     * @param {string} url The url to fetch
     * @param {Function} cb A node style callback to receive the results
     */
    function fetchJSON(url, cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    cb(null, xhr.response);
                } else {
                    cb(new Error('Error: ' + xhr.status + ' ' + xhr.statusText));
                }
            }
        };
        xhr.send();
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
    function main() {

        const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100?json';

        const root = document.getElementById('root');

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
            class: 'infoDiv',
            id: 'infoDiv'
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

        fetchJSON(url, function (error, data) {
            if (error !== null) {
                container.innerHTML = error.message;

            } else {
                manipulateSelect(data);
            }
        });

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
    function getRepoInformation(data) {
        const ulInfo = document.getElementById('info');

        ulInfo.innerHTML = '';

        fetchJSON(data, (error, rep) => {
            if (error !== null) {
                document.getElementById('container').innerHTML = error.message;
            } else {

                createAndAppend('li', ulInfo, {
                    html: 'Name : ' + "<a href=" + rep.html_url + ' target="_blank" >' + rep.name + "</a>",

                });

                createAndAppend('li', ulInfo, {
                    html: 'Description : ' + '<span>' + rep.description + '</span>'
                });

                createAndAppend('li', ulInfo, {
                    html: 'Forks : ' + '<span>' + rep.forks + '</span>'
                });

                createAndAppend('li', ulInfo, {
                    html: 'Updated : ' + '<span>' + rep.updated_at + '</span>'
                });


            }
        });


    }

    /**
     * Return Information of Contributor
     * @param {object} DOM element 
     */
    function getContributorInformation(data) {

        const ulImg = document.getElementById('imgUl');

        ulImg.innerHTML = '';

        fetchJSON(data, (error, rep) => {

            if (error !== null) {
                document.getElementById('container').innerHTML = error.message;
            } else {
                const url1 = rep.contributors_url;

                fetchJSON(url1, (error, contributors) => {

                    if (error !== null) {
                        document.getElementById('container').innerHTML = error.message;

                    } else {

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
                    }
                });
            }
        });
    }
}