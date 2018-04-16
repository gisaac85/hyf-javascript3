/* eslint-disable no-unused-vars */
'use strict';
class View {

    /** 
     * Creates an element and appends it to a parent
     * @param {string} name The tag name of the element to create
     * @param {string} parent The element to which to append the created element
     * @param {object} options Attributes to assign to the created elements
     */
    createAndAppend(name, parent, options = {}) {
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
     * Fetches JSON data asynchronously
     * @param {string} url The url to fetch
     */
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