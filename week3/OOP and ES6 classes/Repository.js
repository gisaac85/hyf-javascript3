/* global View */
/* eslint-disable no-unused-vars */
'use strict';
class Repository extends View {

    constructor(data) {

        super();
        this._data = data;

    }

    render() {

        try {
            const ulInfo = document.getElementById('info');

            ulInfo.innerHTML = '';

            this.createAndAppend('li', ulInfo, {
                html: 'Name : ' + "<a href=" + this._data.html_url + ' target="_blank" >' + this._data.name + "</a>",

            });

            this.createAndAppend('li', ulInfo, {
                html: 'Description : ' + '<span>' + this._data.description + '</span>'
            });

            this.createAndAppend('li', ulInfo, {
                html: 'Forks : ' + '<span>' + this._data.forks + '</span>'
            });

            this.createAndAppend('li', ulInfo, {
                html: 'Updated : ' + '<span>' + this._data.updated_at + '</span>'
            });

        } catch (err) {
            document.getElementById('container').innerHTML = err.message;
        }
    }

    async fetchContributors(url) {
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