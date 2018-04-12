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
     * sort option value in select DOM element
     * @param {DOM element} element DOM element to sort its option alphabetically
     */
    sortList(ele) {
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

            ele.options[i].text = i + '. ' + parts[1];
            ele.options[i].value = parts[2];
        }
    }

}