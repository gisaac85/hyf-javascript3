'use strict';

window.onload = populateSelect();

let contrAdres = '';

function populateSelect() {

    // CREATE AN XMLHttpRequest OBJECT, WITH GET METHOD.
    const xhr = new XMLHttpRequest(),
        method = 'GET',

        url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100?json'; // ADD THE URL OF THE FILE.

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            // PARSE JSON DATA.
            const repo = JSON.parse(xhr.responseText);

            const h2 = createAndAppend('h2', root);
            h2.innerHTML = "HYF Resporites";

            const ele = createAndAppend('select', root);
            ele.id = 'hyfrepo';

            const ul = createAndAppend('ul', root);
            ul.id = 'ulContr';
            const count = createAndAppend('p', ul);
            const contrList = createAndAppend('li', ul);

            const repoName = createAndAppend('p', root);

            const desc = createAndAppend('p', root);

            const forks = createAndAppend('p', root);

            const updated = createAndAppend('p', root);

            const contr = createAndAppend('p', root);
            contr.id = 'contr';


            ele.innerHTML = "<option value=''>Choose REPO:<selected='selected'></option>";
            for (let i = 0; i < repo.length; i++) {

                // POPULATE SELECT ELEMENT WITH JSON.
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + repo[i]['name'] + '">' + repo[i]['name'] + '</option>';

            }

            ele.addEventListener('change', function () {
                contrList.innerHTML = "";
                count.innerHTML = "";
                const index = ele.selectedIndex - 1;
                if (index < 0) {
                    repoName.innerHTML = 'Repo Name: ';
                    desc.innerHTML = 'Description: ';
                    forks.innerHTML = 'Forks: ';
                    updated.innerHTML = 'Updated: ';
                    contr.innerHTML = "";
                    contrList.innerHTML = "";

                } else {

                    repoName.innerHTML = 'Repo Name: ' + "<a href=" + repo[index].html_url + " target='_blank'>" + repo[index].name + "</a>";
                    desc.innerHTML = 'Description: ' + '<br>' + repo[index].description;
                    forks.innerHTML = 'Forks: ' + '<br>' + repo[index].forks;
                    updated.innerHTML = 'Updated: ' + '<br>' + repo[index].updated_at;
                    // contr.innerHTML = 'contributors URL: ' + repo[index].contributors_url;

                    contrAdres = repo[index].contributors_url;

                    const xhr1 = new XMLHttpRequest(),
                        method = 'GET',

                        url = contrAdres; // ADD THE URL OF THE FILE.

                    xhr1.onreadystatechange = function () {

                        if (xhr1.readyState === XMLHttpRequest.DONE && xhr1.status === 200) {

                            // PARSE JSON DATA.
                            const contrRepo = JSON.parse(xhr1.responseText);

                            for (const kk in contrRepo) {

                                contrList.innerHTML += "Contributors Name: " + contrRepo[kk].login + '<br>';
                                contrList.innerHTML += "Contributions: " + contrRepo[kk].contributions;
                                contrList.innerHTML += "<img src=" + contrRepo[kk].avatar_url + ">";

                            }

                            count.innerHTML = "Contributors Number: " + contrRepo.length;
                        }

                    };
                    xhr1.open(method, url, true);
                    xhr1.send();

                }

            });

        }


    };

    xhr.open(method, url, true);
    xhr.send();

}

function createAndAppend(tagName, parent) {
    const elem = document.createElement(tagName);
    parent.appendChild(elem);
    return elem;
}