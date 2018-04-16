/* global View */
/* eslint-disable no-unused-vars */
'use strict';
class Repository extends View {

    constructor(data) {

        super();
        this._data = data;

    }

    render() {
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

    }

    fetchContributors(url) {
        return this.fetchJSON(url);
    }

}