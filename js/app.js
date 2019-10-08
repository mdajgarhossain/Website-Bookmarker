/*Process of form submission*/
const form = document.querySelector('#myForm');

form.addEventListener('submit', saveBookmark);

//Save Bookmark (callback)
function saveBookmark(event) {
    //Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        siteName,
        siteUrl
    };
    
    //Set bookmark in local storage
    if(localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.querySelector('#myForm').reset();

    fetchBookmarks();

    //Prevent form from submitting
    event.preventDefault();
}

//Delete Bookmark
function deleteBookmark(siteUrl) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(let index in bookmarks) {
        if(bookmarks[index].siteUrl === siteUrl) {
            bookmarks.splice(index, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

/*Process building output */
function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    let bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';

    for(let index in bookmarks) {
        let siteName = bookmarks[index].siteName;
        let siteUrl = bookmarks[index].siteUrl;

        bookmarksResults.innerHTML += `<div class="card card-body bg-light mb-3"> 
        <h3> ${siteName} <a class="btn btn-secondary ml-3" target="_blank" href="${addhttp(siteUrl)}"> Visit </a> <a onclick="deleteBookmark('${siteUrl}')" class="btn btn-danger" href="#"> Delete </a> </h3> </div>`;
    }
}

//form validation
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    //regular expression to match a URL
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use valid URL');
        return false;
    }

    return true;
}

function addhttp(siteUrl) {
    if (!/^(?:f|ht)tps?\:\/\//.test(siteUrl)) {
        siteUrl = "http://" + siteUrl;
    }
    return siteUrl;
}

