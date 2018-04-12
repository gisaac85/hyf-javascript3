/* global View,Repository */
/* eslint-disable no-unused-vars */
'use strict';
class Contributor extends View {
    constructor(data) {
        super();
        this._data = data;
    }

    /**
     * Render the contributor info to the DOM.
     * @param {HTML element} parent The parent element in which to render the contributor.
     * info.
     */
    async render() {
        try {

            const ulImg = document.getElementById('imgUl');

            ulImg.innerHTML = '';

            this._data.forEach(contributor => {

                const el = this.createAndAppend('li', ulImg, {
                    class: 'element'
                });

                this.createAndAppend('img', el, {
                    src: contributor.avatar_url
                });

                this.createAndAppend('div', el, {
                    html: contributor.login,
                    id: 'contributorName'
                });

                this.createAndAppend('div', el, {
                    html: contributor.contributions,
                    id: 'contributionsCounter'
                });

            });

        } catch (err) {
            document.getElementById('container').innerHTML = err.message;
        }

    }
}