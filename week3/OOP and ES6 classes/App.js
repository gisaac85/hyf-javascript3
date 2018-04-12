/* global View, Repository, Contributor */
/* eslint-disable no-unused-vars */
'use strict'; {

    class App extends View {

        async start() {

            try {

                const root = document.getElementById('root');

                const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

                this.createAndAppend('h1', root, {
                    html: 'HYF SPA'
                });

                const header = this.createAndAppend('div', root, {
                    id: 'header'
                });

                this.createAndAppend('label', header, {
                    html: 'Select a Repository:'

                });

                const container = this.createAndAppend('div', root, {
                    class: 'container',
                    id: 'container'
                });

                const informationDiv = this.createAndAppend('div', container, {
                    class: 'infoDiv'
                });

                this.createAndAppend('ul', informationDiv, {
                    id: 'info'
                });

                const imagesDiv = this.createAndAppend('div', container, {
                    class: 'imgDiv'
                });

                this.createAndAppend('ul', imagesDiv, {
                    id: 'imgUl'
                });

                const data = await this.fetchJSON(url);

                this.manipulateSelect(data);

            } catch (err) {
                document.getElementById('container').innerHTML = err.message;
            }

        }

        manipulateSelect(repos) {

            const select = this.createAndAppend('select', document.getElementById('header'));

            this.createAndAppend('option', select, {

                html: 'Select Repo',

            });

            this.createAndAppend('optgroup', select, {
                label: '--------------------------------'
            });

            repos.forEach((repo, i) => {
                this.createAndAppend('option', select, {
                    html: repos[i].name,
                    value: i
                });
            });

            this.sortList(select);

            select.addEventListener('change', () => {
                const index = select.selectedIndex;
                if (index > 0) {
                    const r = new Repository(repos[select.value]);
                    r.render();
                    const repoContr = r.fetchContributors(repos[select.value].contributors_url)
                        .then(contributors => {
                            const c = new Contributor(contributors);
                            c.render(contributors);
                        });

                } else {
                    const ulInfo = document.getElementById('info');
                    ulInfo.innerHTML = '';
                    const ulImg = document.getElementById('imgUl');
                    ulImg.innerHTML = '';
                }

            });

        }


        fetchJSON(url) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'json';
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status < 400) {
                            resolve(xhr.response);
                        } else {
                            reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
                        }
                    }
                };
                xhr.send();
            });
        }
    }

    window.onload = () => {
        const app = new App();
        app.start();
    };
}