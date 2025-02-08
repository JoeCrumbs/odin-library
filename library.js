//class Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};
// class methods
Book.prototype.changeStatus = function() {
        this.read = !this.read;
};
//library functionality
const library = {
    myLibrary: [],
    addBookToLibrary: function(title, author, pages, read) {
        title = title || document.querySelector('#title').value;
        author = author || document.querySelector('#author').value;
        pages = pages || document.querySelector('#pages').value;
        read = (typeof read === 'undefined') ? document.querySelector('#read').checked : read;
        this.myLibrary.push(new Book(title, author, pages, read));
        this.populateStorage();
    },
    displayLibrary: function() {
        this.loadLibraryFromStorage();
        if (this.myLibrary.length === 0) {
            this.setExamples();
        }
        let lib = document.querySelector('#book-table');
        this.myLibrary.forEach( (el, ind) => {
            this.displayBook(ind);
        })
    },
    displayBook: function(ind) {
        let el = this.myLibrary[ind];
        let lib = document.querySelector('#book-table');
        let div = document.createElement('li');
        let title = document.createElement('h2');
        let delButton = document.createElement('button');
        let readButton = document.createElement('button');
        title.textContent = el.title;
        div.classList.add('book');
        delButton.classList.add('book-delete');
        delButton.textContent = 'delete';
        readButton.classList.add((el.read) ? 'book-read' : 'book-unread');
        readButton.textContent = (el.read) ? 'unread' : 'read';
        div.dataset.bookNumber = ind;
        div.appendChild(title);
        for (prop in el) {
            if (!el.hasOwnProperty(prop) || prop === 'title' || prop === 'read') continue;
            let paragraph = document.createElement('p');
            paragraph.textContent = el[prop] + ((prop === 'pages') ? ' ' + prop : '');
            div.appendChild(paragraph);
        }
        delButton.addEventListener('click', () => this.delete(ind));
        readButton.addEventListener('click', () => this.changeStatus(ind));
        div.appendChild(readButton);
        div.appendChild(delButton);
        lib.appendChild(div);
    },
    loadLibraryFromStorage: function() {
        if (this.storageAvailable && localStorage.getItem('library')) {
            this.myLibrary = JSON.parse(localStorage.getItem('library')).filter( el => {
                return el != undefined
            }).map( el => {
                return Object.assign(new Book(), el);
            });
            localStorage.setItem('library', JSON.stringify(this.myLibrary));
        }
    },
    populateStorage: function() {
        if (this.storageAvailable) {
            localStorage.setItem('library', JSON.stringify(this.myLibrary));
        }
    },
    setExamples: function() {
        this.addBookToLibrary('My Struggle - Book 1', 'Karl Ove Knausgaard ', 496, false);
        this.addBookToLibrary('The Girl with the Dragon Tattoo', 'Stieg Larsson', 544, false);
        this.addBookToLibrary('Hard-Boiled Wonderland and the End of the World', 'Haruki Murakami', 416, false);
        this.addBookToLibrary('Siddhartha', 'Hermann Hesse', 128, false);
    },
    delete: function(bookNumber) {
        let el = document.querySelector(`[data-book-number="${bookNumber}"]`);
        el.remove();
        delete this.myLibrary[bookNumber];
        this.populateStorage();
    },
    changeStatus: function(bookNum) {
        let el = document.querySelector(`[data-book-number="${bookNum}"] > button:first-of-type`);
        this.myLibrary[bookNum].changeStatus();
        el.textContent = (this.myLibrary[bookNum].read) ? 'unread' : 'read';
        if (this.storageAvailable) {
            localStorage.setItem('library', JSON.stringify(this.myLibrary));
        }
        el.classList.toggle('book-read');
        el.classList.toggle('book-unread');
    },
    storageAvailable: (function(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    })('localStorage'),
    main: function() {
        document.querySelector('#bookForm').addEventListener('submit', e => {
            document.getElementById("bookForm").style.display = "none";
            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#pages').value = '';
            document.querySelector('#read').checked = false;
            e.preventDefault();
            document.getElementById("popdiv").style.display = "none";
        });
        
        document.querySelector('#new-book').addEventListener('click', () => {
            document.getElementById("popdiv").style.display = "block";
            document.getElementById("bookForm").style.display = "block";
        });

        document.querySelector('#add-book').addEventListener('click', () => {
            library.addBookToLibrary();
            library.displayBook(library.myLibrary.length - 1);
        });
          
        library.displayLibrary();
    }
}
library.main();